#!/usr/bin/env bun
/**
 * Read-only graph and geometry audit for portfolio diagrams.
 *
 * Usage:
 *   bun audit-diagrams.ts [--browser] [--pretty] [--diagram <id>]
 *
 * JSON is written to stdout. Confirmed errors produce exit code 1; warnings and
 * manual-review candidates do not. The tool never rewrites diagram sources.
 */
import { existsSync, readdirSync, readFileSync } from "fs";
import { basename, join } from "path";

export type Severity = "error" | "warning" | "review";
export type Finding = {
  id: string;
  severity: Severity;
  rule: string;
  message: string;
  details?: Record<string, unknown>;
};
export type DiagramResult = {
  id: string;
  nodes: number;
  edges: number;
  findings: Finding[];
  browserChecked: boolean;
};

type NodeDef = {
  id: string;
  label: string;
  sub?: string;
  column?: number;
  row?: number;
  children?: NodeDef[];
};
type EdgeDef = { from: string; to: string; label?: string; accent?: boolean; color?: string };
type GraphDef = { title?: string; nodes: NodeDef[]; edges: EdgeDef[] };
type Point = { x: number; y: number };
type Box = { id?: string; label?: string; x: number; y: number; w: number; h: number; className: string };
type SvgText = { text: string; x: number; y: number; anchor: string; className: string };
type SvgEdge = { d: string; marker: string; points: Point[]; hasCurve: boolean };
type ParsedSvg = {
  width: number;
  height: number;
  boxes: Box[];
  texts: SvgText[];
  edges: SvgEdge[];
  source: string;
};

type AuditOptions = { browser?: boolean; only?: string; root?: string };

const DEFAULT_ROOT = import.meta.dir;
const EPS = 1e-6;
const NODE_CLASSES = new Set([
  "box", "box-accent", "box-green", "box-warm", "box-purple", "box-teal",
  "box-slate", "box-indigo", "box-rose", "box-orange", "box-cyan",
]);

function decodeXml(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gs)) out[match[1]] = decodeXml(match[3]);
  return out;
}

function n(value: string | undefined): number {
  return value === undefined ? NaN : Number(value);
}

function flattenPath(d: string): { points: Point[]; hasCurve: boolean } {
  const tokens = [...d.matchAll(/-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?|[A-Za-z]/gi)].map(m => m[0]);
  const points: Point[] = [];
  let i = 0, command = "", current: Point = { x: 0, y: 0 }, start: Point = { x: 0, y: 0 };
  let hasCurve = false;
  const isCommand = (value:string|undefined) => !!value && /^[A-Za-z]$/.test(value);
  const requireNumbers = (count:number) => {
    if (i + count > tokens.length || tokens.slice(i,i+count).some(isCommand)) throw new Error(`incomplete ${command} command in path: ${d}`);
  };
  const number = () => Number(tokens[i++]);
  while (i < tokens.length) {
    if (isCommand(tokens[i])) {
      command = tokens[i++];
      if (!/^[MLQZ]$/i.test(command)) throw new Error(`unsupported SVG path command ${command}: ${d}`);
    }
    if (!command) throw new Error(`path data has no command: ${d}`);
    const relative = command === command.toLowerCase();
    const upper = command.toUpperCase();
    if (upper === "Z") {
      points.push({ ...start }); current = { ...start }; command = "";
    } else if (upper === "M" || upper === "L") {
      requireNumbers(2);
      let x = number(), y = number();
      if (relative) { x += current.x; y += current.y; }
      current = { x, y };
      if (upper === "M") start = { ...current };
      points.push({ ...current });
      if (upper === "M") command = relative ? "l" : "L";
    } else if (upper === "Q") {
      requireNumbers(4);
      let cx = number(), cy = number(), x = number(), y = number();
      if (relative) { cx += current.x; cy += current.y; x += current.x; y += current.y; }
      const p0 = { ...current }; hasCurve = true;
      for (let step = 1; step <= 12; step++) {
        const t = step / 12, u = 1 - t;
        points.push({ x: u*u*p0.x + 2*u*t*cx + t*t*x, y: u*u*p0.y + 2*u*t*cy + t*t*y });
      }
      current = { x, y };
    }
  }
  if (points.length < 2) throw new Error(`path has fewer than two points: ${d}`);
  return { points, hasCurve };
}

export function parseSvg(source: string): ParsedSvg {
  const open = source.match(/<svg\b[^>]*>/)?.[0] || "";
  const svgAttrs = attrs(open);
  const viewBox = (svgAttrs.viewBox || "").trim().split(/[ ,]+/).map(Number);
  if (viewBox.length !== 4 || viewBox.some(Number.isNaN)) throw new Error("missing or invalid SVG viewBox");
  const [, , width, height] = viewBox;
  const boxes: Box[] = [];
  for (const match of source.matchAll(/<rect\b[^>]*\/?\s*>/g)) {
    const a = attrs(match[0]), className = a.class || "";
    if (!NODE_CLASSES.has(className)) continue;
    boxes.push({ x: n(a.x) || 0, y: n(a.y) || 0, w: n(a.width), h: n(a.height), className });
  }
  const texts: SvgText[] = [];
  for (const match of source.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)) {
    const a = attrs(`<text ${match[1]}>`);
    const text = decodeXml(match[2].replace(/<[^>]+>/g, "").trim());
    texts.push({ text, x: n(a.x), y: n(a.y), anchor: a["text-anchor"] || "start", className: a.class || "" });
  }
  const edges: SvgEdge[] = [];
  for (const match of source.matchAll(/<path\b[^>]*\/?\s*>/g)) {
    const a = attrs(match[0]);
    if (!a["marker-end"] || !a.d) continue;
    const flat = flattenPath(a.d);
    edges.push({ d: a.d, marker: a["marker-end"], points: flat.points, hasCurve: flat.hasCurve });
  }
  return { width, height, boxes, texts, edges, source };
}

function pointInBox(p: Point, b: Box, inset = 0): boolean {
  return p.x > b.x + inset && p.x < b.x + b.w - inset && p.y > b.y + inset && p.y < b.y + b.h - inset;
}

function pointOnBoundary(p: Point, b: Box, tolerance = 2.5): boolean {
  const withinX = p.x >= b.x - tolerance && p.x <= b.x + b.w + tolerance;
  const withinY = p.y >= b.y - tolerance && p.y <= b.y + b.h + tolerance;
  const edge = Math.min(Math.abs(p.x-b.x), Math.abs(p.x-(b.x+b.w)), Math.abs(p.y-b.y), Math.abs(p.y-(b.y+b.h)));
  return withinX && withinY && edge <= tolerance;
}

function boxOverlap(a: Box, b: Box, padding = 0): boolean {
  return a.x + padding < b.x + b.w && a.x + a.w - padding > b.x && a.y + padding < b.y + b.h && a.y + a.h - padding > b.y;
}

function orientation(a: Point, b: Point, c: Point): number {
  return (b.x-a.x)*(c.y-a.y) - (b.y-a.y)*(c.x-a.x);
}

function onSegment(a: Point, b: Point, p: Point): boolean {
  return Math.abs(orientation(a,b,p)) < EPS && p.x >= Math.min(a.x,b.x)-EPS && p.x <= Math.max(a.x,b.x)+EPS && p.y >= Math.min(a.y,b.y)-EPS && p.y <= Math.max(a.y,b.y)+EPS;
}

function segmentIntersection(a: Point, b: Point, c: Point, d: Point): Point | null {
  const r = { x: b.x-a.x, y: b.y-a.y }, s = { x: d.x-c.x, y: d.y-c.y };
  const den = r.x*s.y-r.y*s.x;
  const q = { x: c.x-a.x, y: c.y-a.y };
  if (Math.abs(den) < EPS) {
    for (const p of [a,b]) if (onSegment(c,d,p)) return { ...p };
    for (const p of [c,d]) if (onSegment(a,b,p)) return { ...p };
    return null;
  }
  const t = (q.x*s.y-q.y*s.x)/den, u = (q.x*r.y-q.y*r.x)/den;
  return t >= -EPS && t <= 1+EPS && u >= -EPS && u <= 1+EPS ? { x:a.x+t*r.x, y:a.y+t*r.y } : null;
}

function segmentHitsBox(a: Point, b: Point, box: Box, inset = 1.5): boolean {
  const q: Box = { ...box, x:box.x+inset, y:box.y+inset, w:box.w-2*inset, h:box.h-2*inset };
  if (pointInBox(a,q) || pointInBox(b,q)) return true;
  const corners = [
    {x:q.x,y:q.y},{x:q.x+q.w,y:q.y},{x:q.x+q.w,y:q.y+q.h},{x:q.x,y:q.y+q.h},
  ];
  return corners.some((p,i) => segmentIntersection(a,b,p,corners[(i+1)%4]) !== null);
}

function hexLuminance(hex:string):number{
  const channels=(hex.match(/[0-9a-f]{2}/gi)||[]).map(value=>parseInt(value,16)/255).map(value=>value<=0.04045?value/12.92:((value+0.055)/1.055)**2.4);
  if(channels.length!==3)return NaN;
  return 0.2126*channels[0]+0.7152*channels[1]+0.0722*channels[2];
}

function contrastRatio(a:string,b:string):number{
  const x=hexLuminance(a),y=hexLuminance(b);
  return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);
}

function cssFill(css:string,className:string):string|undefined{
  return css.match(new RegExp(`\\.${className.replace(/[.*+?^${}()|[\\]\\\\]/g,"\\$&")}\\s*\\{[^}]*fill:\\s*(#[0-9a-f]{6})`,"i"))?.[1];
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,80);
}

function finding(severity: Severity, rule: string, message: string, key = "", details?: Record<string, unknown>): Finding {
  return { id: `${rule}:${slug(key || message)}`, severity, rule, message, ...(details ? { details } : {}) };
}

function mapBoxes(graph: GraphDef, svg: ParsedSvg, findings: Finding[]): Map<string, Box> {
  const allNodes = graph.nodes.flatMap(node => [node, ...(node.children || [])]);
  const mapped = new Map<string, Box>();
  const used = new Set<Box>(), usedLabels = new Set<SvgText>();
  for (const node of allNodes) {
    const matches = svg.texts.filter(t => !usedLabels.has(t) && t.text === node.label && t.className.includes("label"));
    const pairs = matches.flatMap(label => svg.boxes.filter(b => !used.has(b) && label.x >= b.x-EPS && label.x <= b.x+b.w+EPS && label.y >= b.y-EPS && label.y <= b.y+b.h+EPS).map(box=>({label,box})));
    if (!pairs.length) {
      findings.push(finding("error","svg-node-label",`${node.id}: no unused rendered label/box pair for ${JSON.stringify(node.label)}`,node.id));
      continue;
    }
    const {label,box}=pairs[0];
    usedLabels.add(label); box.id = node.id; box.label = node.label; used.add(box); mapped.set(node.id,box);
    if (node.sub && !svg.texts.some(t => t.text === node.sub && t.className.includes("sub") && t.x >= box.x-EPS && t.x <= box.x+box.w+EPS && t.y >= box.y-EPS && t.y <= box.y+box.h+EPS)) {
      findings.push(finding("error","svg-node-sub",`${node.id}: rendered subtitle does not match JSON`,node.id));
    }
  }
  if (used.size !== svg.boxes.length) findings.push(finding("error","svg-extra-box",`${svg.boxes.length-used.size} rendered node box(es) do not map to JSON nodes`,String(svg.boxes.length-used.size)));
  return mapped;
}

function graphChecks(graph: GraphDef, findings: Finding[]): boolean {
  if (!graph || typeof graph !== "object" || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) {
    findings.push(finding("error","graph-schema","graph must be an object with nodes and edges arrays")); return false;
  }
  if (graph.nodes.some(node=>!node||typeof node!=="object"||(node.children!==undefined&&!Array.isArray(node.children)))) {
    findings.push(finding("error","graph-schema","every node must be an object and children must be an array")); return false;
  }
  if (graph.nodes.some(node=>(node.children||[]).some(child=>!child||typeof child!=="object"))) {
    findings.push(finding("error","graph-schema","every child must be an object")); return false;
  }
  if (graph.edges.some(edge=>!edge||typeof edge!=="object"||typeof edge.from!=="string"||typeof edge.to!=="string")) {
    findings.push(finding("error","graph-schema","every edge must have string from and to fields")); return false;
  }
  const topIds = graph.nodes.map(n=>n.id);
  const allIds = graph.nodes.flatMap(n=>[n.id,...(n.children||[]).map(c=>c.id)]);
  const seen = new Set<string>();
  for (const id of allIds) {
    if (!id || typeof id !== "string") findings.push(finding("error","node-id","Every node and child needs a string id"));
    else if (seen.has(id)) findings.push(finding("error","duplicate-node",`Duplicate node id: ${id}`,id));
    else seen.add(id);
  }
  for (const node of graph.nodes.flatMap(n=>[n,...(n.children||[])])) {
    if (!node.label || typeof node.label !== "string") findings.push(finding("error","node-label",`${node.id || "node"}: missing string label`,node.id));
  }
  const edgeKeys = new Set<string>();
  for (const [index,e] of graph.edges.entries()) {
    const key = `${e.from}->${e.to}`;
    if (!seen.has(e.from)) findings.push(finding("error","edge-source",`Edge ${index} has unknown source: ${e.from}`,key));
    if (!seen.has(e.to)) findings.push(finding("error","edge-target",`Edge ${index} has unknown target: ${e.to}`,key));
    if (e.from === e.to) findings.push(finding("warning","self-loop",`Self-loop on ${e.from}`,key));
    if (edgeKeys.has(key)) findings.push(finding("warning","duplicate-edge",`Duplicate edge ${key}`,key));
    edgeKeys.add(key);
  }
  if (topIds.length > 1) {
    const adjacent = new Map(topIds.map(id=>[id,new Set<string>()]));
    const outgoing = new Map(topIds.map(id=>[id,new Set<string>()]));
    const incoming = new Map(topIds.map(id=>[id,0]));
    for (const e of graph.edges) if (adjacent.has(e.from) && adjacent.has(e.to)) {
      adjacent.get(e.from)!.add(e.to); adjacent.get(e.to)!.add(e.from);
      outgoing.get(e.from)!.add(e.to); incoming.set(e.to,(incoming.get(e.to)||0)+1);
    }
    const visited = new Set<string>(), components:string[][]=[];
    for (const id of topIds) if (!visited.has(id)) {
      const component:string[]=[], queue=[id];visited.add(id);
      while(queue.length){const x=queue.shift()!;component.push(x);for(const y of adjacent.get(x)||[])if(!visited.has(y)){visited.add(y);queue.push(y)}}
      components.push(component);
    }
    if (components.length>1) findings.push(finding("warning","disconnected-graph",`Graph has ${components.length} disconnected components`,components.map(c=>c.join(",")).join("|"),{components}));
    if (components.length===1 && graph.edges.length) {
      const roots=topIds.filter(id=>(incoming.get(id)||0)===0);
      if (roots.length) {
        const reachable=new Set<string>(roots),queue=[...roots];
        while(queue.length){const x=queue.shift()!;for(const y of outgoing.get(x)||[])if(!reachable.has(y)){reachable.add(y);queue.push(y)}}
        const unreachable=topIds.filter(id=>!reachable.has(id));
        if(unreachable.length)findings.push(finding("review","directed-reachability",`Nodes are not reachable from any directed root: ${unreachable.join(", ")}`,unreachable.join("-"),{roots,unreachable}));
      } else findings.push(finding("review","directed-cycle",`Connected graph has no directed root`,topIds.join("-")));
    }
  }
  return true;
}

function svgChecks(graph: GraphDef, svg: ParsedSvg, mapped: Map<string,Box>, findings: Finding[]): void {
  const darkAt=svg.source.indexOf("@media (prefers-color-scheme: dark)"),style=svg.source.match(/<style>([\s\S]*?)<\/style>/)?.[1]||"";
  if (darkAt<0) findings.push(finding("error","dark-theme","SVG has no dark-mode media query"));
  else {
    const lightCss=style.slice(0,style.indexOf("@media (prefers-color-scheme: dark)")),darkCss=style.slice(style.indexOf("@media (prefers-color-scheme: dark)"));
    const classes=[...new Set(svg.boxes.map(box=>box.className))];
    for(const [theme,css] of [["light",lightCss],["dark",darkCss]] as const){
      for(const textClass of ["label","sub"]){
        const foreground=cssFill(css,textClass);
        if(!foreground){findings.push(finding("error","contrast-style",`${theme}: missing ${textClass} fill colour`,`${theme}-${textClass}`));continue;}
        for(const className of classes){
          const background=cssFill(css,className);
          if(!background){findings.push(finding("error","contrast-style",`${theme}: missing ${className} fill colour`,`${theme}-${className}`));continue;}
          const ratio=contrastRatio(foreground,background),minimum=4.5;
          if(ratio+EPS<minimum)findings.push(finding("error","text-contrast",`${theme}: ${textClass} ${foreground} has ${ratio.toFixed(2)}:1 contrast on ${className} ${background}`,`${theme}-${textClass}-${className}`,{foreground,background,ratio,minimum}));
        }
      }
    }
  }
  if (!svg.source.includes('marker id="ah"') || !svg.source.includes('marker id="ahs"')) findings.push(finding("error","markers","SVG is missing shared arrow markers"));
  for (const box of svg.boxes) if (box.x < -EPS || box.y < -EPS || box.x+box.w > svg.width+EPS || box.y+box.h > svg.height+EPS)
    findings.push(finding("error","box-viewbox",`${box.id||box.label||"box"} extends outside the viewBox`,box.id||box.label));
  const mappedBoxes=[...mapped.values()];
  for(let i=0;i<mappedBoxes.length;i++)for(let j=i+1;j<mappedBoxes.length;j++)if(boxOverlap(mappedBoxes[i],mappedBoxes[j],1))
    findings.push(finding("error","node-overlap",`${mappedBoxes[i].id} overlaps ${mappedBoxes[j].id}`,`${mappedBoxes[i].id}-${mappedBoxes[j].id}`));
  if (svg.edges.length !== graph.edges.length) findings.push(finding("error","edge-count",`JSON has ${graph.edges.length} edges but SVG has ${svg.edges.length} marked paths`,`${graph.edges.length}-${svg.edges.length}`));
  const count=Math.min(svg.edges.length,graph.edges.length);
  for(let i=0;i<count;i++){
    const edge=graph.edges[i], path=svg.edges[i], from=mapped.get(edge.from), to=mapped.get(edge.to), pts=path.points;
    const key=`${edge.from}->${edge.to}`;
    if(pts.length<2){findings.push(finding("error","edge-path",`Edge ${key} has an unreadable path`,key));continue;}
    const start=pts[0],end=pts[pts.length-1];
    if(from&&!pointOnBoundary(start,from))findings.push(finding("error","edge-start",`Edge ${key} does not start on the source box`,key,{start}));
    if(to&&!pointOnBoundary(end,to))findings.push(finding("error","edge-end",`Edge ${key} does not end on the target box`,key,{end}));
    const expectedMarker=edge.accent?"url(#ahs)":"url(#ah)";
    if(path.marker!==expectedMarker)findings.push(finding("error","edge-marker",`Edge ${key} uses the wrong arrow marker`,key,{marker:path.marker,expected:expectedMarker}));
    if(!path.hasCurve && pts.length>2)findings.push(finding("review","hard-corner-route",`Edge ${key} changes direction without a rounded curve`,key));
    for(const box of mappedBoxes){if(box.id===edge.from||box.id===edge.to)continue;let hit=false;for(let s=0;s<pts.length-1&&!hit;s++)hit=segmentHitsBox(pts[s],pts[s+1],box);if(hit)findings.push(finding("error","edge-through-node",`Edge ${key} crosses unrelated node ${box.id}`,`${key}-${box.id}`));}
    for(const p of pts)if(p.x < -EPS||p.y < -EPS||p.x>svg.width+EPS||p.y>svg.height+EPS){findings.push(finding("error","edge-viewbox",`Edge ${key} leaves the viewBox`,key,{point:p}));break;}
  }
  for(let i=0;i<count;i++)for(let j=i+1;j<count;j++){
    const a=graph.edges[i],b=graph.edges[j];
    if(a.from===b.from||a.from===b.to||a.to===b.from||a.to===b.to)continue;
    const pa=svg.edges[i].points,pb=svg.edges[j].points;let cross:Point|null=null;
    for(let x=0;x<pa.length-1&&!cross;x++)for(let y=0;y<pb.length-1&&!cross;y++){const p=segmentIntersection(pa[x],pa[x+1],pb[y],pb[y+1]);if(p)cross=p;}
    if(cross)findings.push(finding("review","edge-crossing",`Edges ${a.from}->${a.to} and ${b.from}->${b.to} intersect`,`${a.from}-${a.to}-${b.from}-${b.to}`,{point:cross}));
  }
  if(graph.title){
    const title=svg.texts.filter(t=>t.text===graph.title&&t.className.includes("sub")&&t.anchor==="middle"&&Math.abs(t.x-svg.width/2)<=1&&Math.abs(t.y-(svg.height-4))<=1);
    if(title.length!==1)findings.push(finding("error","svg-title",`Expected one centred footer title matching JSON, found ${title.length}`,graph.title));
  }
}

async function browserChecks(id:string, svgSource:string, graph:GraphDef, mapped:Map<string,Box>, findings:Finding[]):Promise<boolean>{
  let chromium:any,browser:any;
  try {
    ({chromium}=await import("playwright"));
    browser=await chromium.launch({headless:true});
    const nodes=graph.nodes.flatMap(node=>[node,...(node.children||[])]).flatMap(node=>{
      const rect=mapped.get(node.id);
      if(!rect)return[];
      return [
        {id:node.id,text:node.label,className:"label",rect},
        ...(node.sub?[{id:node.id,text:node.sub,className:"sub",rect}]:[]),
      ];
    });
    for(const theme of ["light","dark"]){
      const page=await browser.newPage({viewport:{width:1400,height:900},colorScheme:theme});
      try{
        await page.setContent(`<style>body{margin:0}</style>${svgSource}`);
        const result=await page.evaluate((expected:{id:string;text:string;className:string;rect:Box}[])=>expected.map(item=>{
          const candidates=[...document.querySelectorAll(`text.${item.className}`)].filter(label=>{
            const x=Number(label.getAttribute("x")),y=Number(label.getAttribute("y"));
            return label.textContent?.trim()===item.text&&x>=item.rect.x&&x<=item.rect.x+item.rect.w&&y>=item.rect.y&&y<=item.rect.y+item.rect.h;
          });
          if(candidates.length!==1)return{...item,missing:true,candidates:candidates.length};
          const box=(candidates[0] as SVGGraphicsElement).getBBox(),rb=item.rect;
          return{...item,overflow:box.x<rb.x+3||box.x+box.width>rb.x+rb.w-3||box.y<rb.y+2||box.y+box.height>rb.y+rb.h-2,box:{x:box.x,y:box.y,w:box.width,h:box.height}};
        }),nodes);
        for(const r of result)if(r.missing)findings.push(finding("error","browser-node-map",`${id}/${theme}: expected one ${r.className} ${JSON.stringify(r.text)} in ${r.id}, found ${r.candidates}`,`${theme}-${r.id}-${r.className}`));else if(r.overflow)findings.push(finding("warning","text-overflow",`${id}/${theme}: ${r.className} ${JSON.stringify(r.text)} exceeds node ${r.id}`,`${theme}-${r.id}-${r.className}`,r));
      } finally { await page.close(); }
    }
    return true;
  } catch(error) {
    findings.push(finding("error","browser-failure",`${id}: browser audit failed: ${String(error)}`,id));
    return false;
  } finally { if(browser)await browser.close().catch(()=>{}); }
}

export async function auditDiagram(id:string, graph:GraphDef, svgSource:string, browser=false):Promise<DiagramResult>{
  const findings:Finding[]=[];
  const validGraph=graphChecks(graph,findings);
  let svg:ParsedSvg|undefined,browserChecked=false;
  try{svg=parseSvg(svgSource);}catch(error){findings.push(finding("error","svg-parse",String(error)));}
  if(svg&&validGraph){const mapped=mapBoxes(graph,svg,findings);svgChecks(graph,svg,mapped,findings);if(browser)browserChecked=await browserChecks(id,svgSource,graph,mapped,findings);}
  const rank:Record<Severity,number>={error:0,warning:1,review:2};
  findings.sort((a,b)=>rank[a.severity]-rank[b.severity]||a.id.localeCompare(b.id));
  const nodeCount=validGraph?graph.nodes.reduce((total,node)=>total+1+(node.children?.length||0),0):0;
  return{id,nodes:nodeCount,edges:validGraph?graph.edges.length:0,findings,browserChecked};
}

export async function auditCorpus(options:AuditOptions={}):Promise<{summary:Record<string,unknown>;diagrams:DiagramResult[]}>{
  const root=options.root||DEFAULT_ROOT,dir=join(root,"_diagrams"),contentDir=join(root,"_content");
  const jsonIds=readdirSync(dir).filter(f=>f.endsWith(".json")).map(f=>basename(f,".json"));
  const svgIds=readdirSync(dir).filter(f=>f.endsWith(".svg")).map(f=>basename(f,".svg"));
  const ids=jsonIds.filter(id=>!options.only||id===options.only).sort();
  const diagrams:DiagramResult[]=[];
  if(options.only&&!ids.length)diagrams.push({id:options.only,nodes:0,edges:0,findings:[finding("error","diagram-missing",`Unknown diagram: ${options.only}`,options.only)],browserChecked:false});
  if(!options.only)for(const id of svgIds.filter(id=>!jsonIds.includes(id)).sort())diagrams.push({id,nodes:0,edges:0,findings:[finding("error","json-missing",`Missing _diagrams/${id}.json`,id)],browserChecked:false});
  for(const id of ids){
    const findings:Finding[]=[];let graph:GraphDef={nodes:[],edges:[]};
    try{graph=JSON.parse(readFileSync(join(dir,`${id}.json`),"utf8"));}catch(error){findings.push(finding("error","json-parse",String(error)));}
    const svgPath=join(dir,`${id}.svg`),contentPath=join(contentDir,`${id}.md`);
    if(!existsSync(svgPath))findings.push(finding("error","svg-missing",`Missing _diagrams/${id}.svg`,id));
    if(!existsSync(contentPath))findings.push(finding("error","content-missing",`Missing _content/${id}.md`,id));
    if(findings.length)diagrams.push({id,nodes:0,edges:0,findings,browserChecked:false});
    else {
      const svgSource=readFileSync(svgPath,"utf8");
      const result=await auditDiagram(id,graph,svgSource,!!options.browser);
      const content=readFileSync(contentPath,"utf8"),start=content.indexOf("<svg"),end=content.indexOf("</svg>",start);
      if(start<0||end<0)result.findings.push(finding("error","inline-svg-missing",`_content/${id}.md has no inline SVG`,id));
      else if(content.slice(start,end+6).trim()!==svgSource.trim())result.findings.push(finding("error","inline-svg-drift",`Inline SVG differs from _diagrams/${id}.svg`,id));
      diagrams.push(result);
    }
  }
  const all=diagrams.flatMap(d=>d.findings);
  return{summary:{generatedAt:new Date().toISOString(),diagrams:diagrams.length,browserChecked:!!options.browser&&diagrams.length>0&&diagrams.every(d=>d.browserChecked),errors:all.filter(f=>f.severity==="error").length,warnings:all.filter(f=>f.severity==="warning").length,review:all.filter(f=>f.severity==="review").length,diagramsWithFindings:diagrams.filter(d=>d.findings.length).length},diagrams};
}

if(import.meta.main){
  const args=Bun.argv.slice(2),browser=args.includes("--browser"),pretty=args.includes("--pretty");
  const at=args.indexOf("--diagram"),only=at>=0?args[at+1]:undefined;
  const report=await auditCorpus({browser,only});
  console.log(JSON.stringify(report,null,pretty?2:0));
  process.exit(Number(report.summary.errors)>0?1:0);
}
