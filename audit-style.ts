#!/usr/bin/env bun
/**
 * Systematic style/structure audit for portfolio source pages.
 * Reports errors, actionable prose fixes and review-only warnings as JSON.
 */
import { readdirSync, readFileSync, existsSync } from "fs";
import { join, basename } from "path";

const ROOT = import.meta.dir;
const contentDir = join(ROOT, "_content");
const files = readdirSync(contentDir).filter(f => f.endsWith(".md")).sort();
const allowedSections = new Set(["agents","ai-ml","apple","cloud-infra","libraries","networking","remote-access","retro-embedded"]);
const allowedStatuses = new Set(["active","archived","experimental","maintained","maintenance","stable"]);
const proseSections = new Set(["About","Motivation","Background","How it works","Features"]);
type Severity = "error"|"fix"|"warning";
type Finding = {severity:Severity,rule:string,text:string};
const pages:any[]=[];

function parseFrontmatter(raw:string){const m=raw.match(/^---\n([\s\S]*?)\n---\n/);const fm:Record<string,string>={};if(!m)return{fm,body:raw};for(const line of m[1].split("\n")){const x=line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);if(x)fm[x[1]]=x[2].trim();}return{fm,body:raw.slice(m[0].length)};}
function sections(body:string){const out:any[]=[];const ms=[...body.matchAll(/^## (.+)$/gm)];for(let i=0;i<ms.length;i++){const start=(ms[i].index||0)+ms[i][0].length+1;const end=i+1<ms.length?(ms[i+1].index||body.length):body.length;out.push({heading:ms[i][1].trim(),content:body.slice(start,end).trim()});}return out;}

for(const file of files){const id=basename(file,".md");const raw=readFileSync(join(contentDir,file),"utf8");const{fm,body}=parseFrontmatter(raw);const ss=sections(body);const findings:Finding[]=[];const add=(severity:Severity,rule:string,text:string)=>findings.push({severity,rule,text});
 for(const key of ["section","status","created","tagline"])if(!fm[key])add("error","frontmatter",`Missing ${key}`);
 if(fm.section&&!allowedSections.has(fm.section))add("error","frontmatter",`Unknown section: ${fm.section}`);
 if(fm.status&&!allowedStatuses.has(fm.status))add("warning","frontmatter",`Unrecognised status: ${fm.status}`);
 if(fm.created&&!/^\d{4}-\d{2}-\d{2}$/.test(fm.created))add("error","frontmatter",`Invalid created date: ${fm.created}`);
 if(fm.logo){if(!existsSync(join(ROOT,fm.logo)))add("error","logo",`Missing asset: ${fm.logo}`);}else add("warning","logo","No curated logo declared; fallback used");
 for(const req of ["About","How it works","Features","Diagram"])if(!ss.some(s=>s.heading===req))add("error","section",`Missing ## ${req}`);
 const features=ss.find(s=>s.heading==="Features");if(features&&![...features.content.matchAll(/^### /gm)].length)add("error","features","No ### feature entries");
 const posts=ss.find(s=>s.heading==="Posts");if(posts){const ls=posts.content.split("\n").filter((x:string)=>/^[-*] /.test(x));if(ls.length>5)add("error","posts",`${ls.length} posts; maximum is 5`);const ds=ls.map((x:string)=>x.match(/—\s*(\d{4}-\d{2}-\d{2})\s*$/)?.[1]||"");if(ds.some((x:string)=>!x))add("warning","posts","Entry without trailing ISO date");if(ds.join()!=[...ds].sort().reverse().join())add("error","posts","Posts are not newest-first");}
 for(const ext of ["json","svg"])if(!existsSync(join(ROOT,"_diagrams",`${id}.${ext}`)))add("error","diagram",`Missing _diagrams/${id}.${ext}`);
 const svgPath=join(ROOT,"_diagrams",`${id}.svg`);if(existsSync(svgPath)){const svg=readFileSync(svgPath,"utf8");if(!svg.includes("prefers-color-scheme: dark"))add("error","diagram","No dark-mode media query");if(!svg.includes("marker-end"))add("warning","diagram","No arrow markers");const dark=svg.slice(svg.indexOf("@media (prefers-color-scheme: dark)"));if(dark.includes(".sub { fill: #5070a0; }"))add("fix","diagram-contrast","Dark secondary text uses #5070a0");}
 for(const sec of ss.filter(s=>proseSections.has(s.heading))){const text=sec.content.replace(/<svg[\s\S]*/,"");const rules:[string,RegExp,Severity][]=[
  ["inflated",/\b(?:production-ready|powerful|robust|seamless|comprehensive|transformative|enterprise-grade|best-in-class|state-of-the-art|amazing|incredible|revolutionary)\b/gi,"fix"],
  ["ai-word",/\b(?:leverage|utilize|delve|streamline|harness|quietly|deeply|fundamentally|remarkably|landscape|tapestry|paradigm|synergy|ecosystem)\b/gi,"fix"],
  ["signpost",/\b(?:That said|(?<=[.!?]\s)For context|(?<=[.!?]\s)For reference|It(?:’|')s worth noting|Importantly|Interestingly|Notably|In conclusion|In summary|To sum up|Here(?:’|')s the (?:thing|kicker)|Think of it as|Let(?:’|')s (?:dive|unpack|explore)|The real (?:test|question)|The main takeaway|The key point|The important distinction)\b/gi,"fix"],
  ["copula-dodge",/\b(?:serves as|stands as|represents)\b/gi,"fix"],
  ["manufactured-contrast",/\b(?:not|isn(?:’|')t|aren(?:’|')t)\b[^.\n]{0,100}\b(?:but|it(?:’|')s|rather than)\b/gi,"warning"],
  ["status-language",/\b(?:remains deferred|remains blocked|remains pending|continues to be|is currently planned|has been deferred)\b/gi,"fix"],
  ["meta-commentary",/\b(?:This document shows|This should not be read as|This does not imply|For the avoidance of doubt)\b/gi,"fix"]];
  for(const[rule,rx,severity]of rules)for(const m of text.matchAll(rx))add(severity,rule,`${sec.heading}: ${m[0]}`);
  for(const para of text.split(/\n\s*\n/)){const n=para.split(/\s+/).filter(Boolean).length;if(n>110)add("warning","long-paragraph",`${sec.heading}: ${n} words`);}
 }
 pages.push({id,findings});
}
const all=pages.flatMap(p=>p.findings);const summary={generated_at:new Date().toISOString(),pages:pages.length,errors:all.filter(f=>f.severity==="error").length,fixes:all.filter(f=>f.severity==="fix").length,warnings:all.filter(f=>f.severity==="warning").length,pages_with_findings:pages.filter(p=>p.findings.length).length};console.log(JSON.stringify({summary,pages},null,2));
