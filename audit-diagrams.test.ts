import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { auditCorpus, auditDiagram } from "./audit-diagrams";
import { renderDiagram } from "./diagram-render";

type Graph = Parameters<typeof renderDiagram>[0];

const base: Graph = {
  title: "fixture",
  nodes: [
    { id:"a", label:"Input", sub:"request", tag:"input", column:0, row:0 },
    { id:"b", label:"Worker", sub:"transform", tag:"processing", column:1, row:0 },
    { id:"c", label:"Output", sub:"result", tag:"output", column:2, row:0 },
  ],
  edges: [
    { from:"a", to:"b", accent:true },
    { from:"b", to:"c", accent:true },
  ],
};

const clone = <T>(value:T):T => structuredClone(value);
const rules = async (graph:Graph, svg=renderDiagram(graph)) => new Set((await auditDiagram("fixture",graph,svg)).findings.map(f=>f.rule));

describe("diagram graph audit",()=>{
  test("accepts a renderer-produced graph",async()=>expect(await rules(base)).toEqual(new Set()));

  test("reports parent and child node counts",async()=>{
    const graph=clone(base);graph.nodes[1].children=[{id:"child",label:"Child"}];
    expect((await auditDiagram("fixture",graph,renderDiagram(graph))).nodes).toBe(4);
  });

  test("detects duplicate node ids",async()=>{
    const graph=clone(base);graph.nodes[2].id="b";
    expect(await rules(graph)).toContain("duplicate-node");
  });

  test("detects unknown edge endpoints",async()=>{
    const graph=clone(base);graph.edges[0].to="missing";
    expect(await rules(graph)).toContain("edge-target");
  });

  test("detects self-loops and duplicate edges",async()=>{
    const graph=clone(base);graph.edges.push({from:"a",to:"a"},{from:"a",to:"b"});
    const found=await rules(graph);
    expect(found).toContain("self-loop");expect(found).toContain("duplicate-edge");
  });

  test("detects disconnected nodes",async()=>{
    const graph=clone(base);graph.edges=graph.edges.slice(0,1);
    expect(await rules(graph)).toContain("disconnected-graph");
  });

  test("detects directed graphs with no root",async()=>{
    const graph=clone(base);graph.edges=[{from:"a",to:"b"},{from:"b",to:"c"},{from:"c",to:"a"}];
    expect(await rules(graph)).toContain("directed-cycle");
  });

  test("detects a directed subgraph unreachable from a root",async()=>{
    const graph:Graph={title:"reach",nodes:[
      {id:"root",label:"Root",column:0,row:0},{id:"a",label:"A",column:1,row:0},
      {id:"b",label:"B",column:2,row:0},{id:"c",label:"C",column:2,row:1},
    ],edges:[{from:"root",to:"a"},{from:"b",to:"a"},{from:"b",to:"c"},{from:"c",to:"b"}]};
    expect(await rules(graph)).toContain("directed-reachability");
  });

  test("reports malformed graph shapes instead of throwing",async()=>{
    for(const graph of [null,{nodes:[null],edges:[]},{nodes:[{id:"a",label:"A",children:{}}],edges:[]}]){
      const result=await auditDiagram("malformed",graph as Graph,renderDiagram(base));
      expect(result.findings.map(f=>f.rule)).toContain("graph-schema");
    }
  });
});

describe("diagram corpus audit",()=>{
  const fixture = () => {
    const root=mkdtempSync(join(tmpdir(),"diagram-audit-"));
    mkdirSync(join(root,"_diagrams"));mkdirSync(join(root,"_content"));
    const svg=renderDiagram(base);
    writeFileSync(join(root,"_diagrams","fixture.json"),JSON.stringify(base));
    writeFileSync(join(root,"_diagrams","fixture.svg"),svg);
    writeFileSync(join(root,"_content","fixture.md"),`## Diagram\n${svg}\n`);
    return root;
  };

  test("accepts matching JSON, standalone SVG and inline SVG",async()=>{
    const root=fixture();try{expect((await auditCorpus({root})).summary.errors).toBe(0);}finally{rmSync(root,{recursive:true,force:true});}
  });

  test("detects inline SVG drift",async()=>{
    const root=fixture();try{
      writeFileSync(join(root,"_content","fixture.md"),`## Diagram\n${renderDiagram(base).replace(">fixture<",">drift<")}\n`);
      const report=await auditCorpus({root});
      expect(report.diagrams.flatMap(d=>d.findings).map(f=>f.rule)).toContain("inline-svg-drift");
    }finally{rmSync(root,{recursive:true,force:true});}
  });

  test("detects an orphan standalone SVG",async()=>{
    const root=fixture();try{
      writeFileSync(join(root,"_diagrams","orphan.svg"),renderDiagram(base));
      const report=await auditCorpus({root});
      expect(report.diagrams.flatMap(d=>d.findings).map(f=>f.rule)).toContain("json-missing");
    }finally{rmSync(root,{recursive:true,force:true});}
  });
});

describe("diagram SVG audit",()=>{
  test("detects missing rendered labels",async()=>{
    const svg=renderDiagram(base).replace(">Worker<",">Missing<");
    expect(await rules(base,svg)).toContain("svg-node-label");
  });

  test("maps duplicate labels by unused rendered occurrence",async()=>{
    const graph=clone(base);graph.nodes[2].label="Worker";
    expect(await rules(graph)).toEqual(new Set());
  });

  test("detects node overlap",async()=>{
    const svg=renderDiagram(base).replace('x="510" y="30" width="180"','x="430" y="30" width="180"').replace(/x="600"/g,'x="520"');
    expect(await rules(base,svg)).toContain("node-overlap");
  });

  test("detects a connector through an unrelated node",async()=>{
    const graph:Graph={title:"cross",nodes:[
      {id:"a",label:"A",column:0,row:0},{id:"obstacle",label:"Obstacle",column:1,row:0},{id:"c",label:"C",column:2,row:0},
    ],edges:[{from:"a",to:"c"}]};
    expect(await rules(graph)).toContain("edge-through-node");
  });

  test("detects connector crossings",async()=>{
    const graph:Graph={title:"cross",nodes:[
      {id:"a",label:"A",column:0,row:0},{id:"b",label:"B",column:0,row:1},
      {id:"c",label:"C",column:1,row:0},{id:"d",label:"D",column:1,row:1},
    ],edges:[{from:"a",to:"d"},{from:"b",to:"c"}]};
    expect(await rules(graph)).toContain("edge-crossing");
  });

  test("detects missing arrow paths",async()=>{
    const svg=renderDiagram(base).replace(/ marker-end="url\(#ahs\)"/,'');
    expect(await rules(base,svg)).toContain("edge-count");
  });

  test("detects wrong markers",async()=>{
    const svg=renderDiagram(base).replace('marker-end="url(#ahs)"','marker-end="url(#ah)"');
    expect(await rules(base,svg)).toContain("edge-marker");
  });

  test("detects an accent marker on a neutral edge",async()=>{
    const graph=clone(base);graph.edges[0].accent=false;
    const svg=renderDiagram(graph).replace('marker-end="url(#ah)"','marker-end="url(#ahs)"');
    expect(await rules(graph,svg)).toContain("edge-marker");
  });

  test("rejects unsupported and incomplete SVG path commands",async()=>{
    for(const d of ['M210,60 H270','M210,60 L']){
      const svg=renderDiagram(base).replace('d="M210,60 L270,60"',`d="${d}"`);
      expect(await rules(base,svg)).toContain("svg-parse");
    }
  });

  test("detects endpoints detached from boxes",async()=>{
    const svg=renderDiagram(base).replace('d="M210,60 L270,60"','d="M220,60 L270,60"');
    expect(await rules(base,svg)).toContain("edge-start");
  });

  test("detects geometry outside the viewBox",async()=>{
    const svg=renderDiagram(base).replace('viewBox="0 0 720 114"','viewBox="0 0 600 114"');
    const found=await rules(base,svg);
    expect(found.has("box-viewbox")||found.has("edge-viewbox")).toBe(true);
  });

  test("detects low-contrast theme text",async()=>{
    const svg=renderDiagram(base).replace('.sub { fill: #243b53; }','.sub { fill: #5070a0; }');
    expect(await rules(base,svg)).toContain("text-contrast");
  });

  test("detects JSON/SVG title disagreement",async()=>{
    const svg=renderDiagram(base).replace(">fixture<",">different<");
    expect(await rules(base,svg)).toContain("svg-title");
  });

  test("does not mistake matching node text for the footer title",async()=>{
    const graph=clone(base);graph.nodes[0].sub="fixture";
    const svg=renderDiagram(graph).replace(/<text x="360" y="110" text-anchor="middle" class="sub">fixture<\/text>/,'<text x="360" y="110" text-anchor="middle" class="sub">missing</text>');
    expect(await rules(graph,svg)).toContain("svg-title");
  });
});
