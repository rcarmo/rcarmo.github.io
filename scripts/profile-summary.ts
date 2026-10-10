import { runDir, within } from "../project-paths";
import { lstatSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
const dir = Bun.argv[2];
if (!dir) throw new Error("Usage: profile-summary.ts <run-profile-dir> [--dispose]");
if (!within(runDir, dir) || lstatSync(dir).isSymbolicLink()) throw new Error("Profiles must be inside the current run");
const files = readdirSync(dir);
let missing = false;
const conclusions: string[] = [];
for (const name of ["tests.jsc-cpu.json", "tests.heapprofile", "fixture-build.cpuprofile", "fixture-build.heapprofile", "resolver-child.cpuprofile", "resolver-child.heapprofile", "site-build.cpuprofile", "site-build.heapprofile"]) {
  if (!files.includes(name)) { console.log(`CAPTURE FAILURE: missing ${name}`); missing = true; }
}
function label(frame: any): string { return `${frame?.functionName || "(anonymous)"} ${frame?.url || ""}:${(frame?.lineNumber ?? -1) + 1}`; }
for (const file of files.filter(f => /\.(cpuprofile|heapprofile)$/.test(f) || f.endsWith('.jsc-cpu.json')).sort()) {
  const raw = await Bun.file(join(dir, file)).json();
  const p = typeof raw === "string" ? JSON.parse(raw) : raw;
  console.log(`\n## ${file}`);
  if(file.endsWith('.jsc-cpu.json')) {
    const traces=p.traces||[];console.log(`CPU samples: ${traces.length}; interval ${p.interval} seconds`);
    conclusions.push(`${file}: ${traces.length} CPU samples at ${p.interval} seconds.`);
    if(!traces.length){missing=true;console.log('CAPTURE FAILURE: empty CPU traces');}
    const sums=new Map<string,number>();
    for(const trace of traces)for(const key of new Set(trace.frames.map(f=>`${f.name} ${f.sourceURL||f.location}`)))sums.set(key,(sums.get(key)||0)+1);
    const ranked = [...sums].sort((a,b)=>b[1]-a[1]);
    for(const [key,n] of ranked.slice(0,20))console.log(`${n} inclusive samples\t${key}`);
    conclusions.push(`Top inclusive CPU: ${ranked.slice(0,3).map(([key,n])=>`${key}: ${n} samples`).join('; ')}.`);
  } else if (file.endsWith("cpuprofile")) {
    const nodes = new Map<number, any>(p.nodes.map(n => [n.id, n]));
    const parents = new Map<number, number>();
    for (const n of p.nodes) for (const child of n.children || []) parents.set(child, n.id);
    const sums = new Map<number, number>();
    for (let i = 0; i < (p.samples || []).length; i++) {
      let id = p.samples[i]; const weight = p.timeDeltas?.[i] ?? 100;
      while (id !== undefined) { sums.set(id, (sums.get(id) || 0) + weight); id = parents.get(id); }
    }
    console.log(`CPU samples: ${p.samples?.length || 0}; elapsed ${(p.endTime - p.startTime) / 1000} ms`);
    conclusions.push(`${file}: ${p.samples?.length || 0} CPU samples; ${((p.endTime-p.startTime)/1000).toFixed(2)} ms sampled interval.`);
    if (!p.samples?.length) { console.log("CAPTURE FAILURE: empty CPU samples"); missing = true; }
    for (const [id, us] of [...sums].sort((a,b)=>b[1]-a[1]).slice(0,20)) console.log(`${(us / 1000).toFixed(3)} ms cumulative\t${label(nodes.get(id)?.callFrame)}`);
  } else {
    // V8 sampling heap profiles include weighted allocation sizes and sample
    // counts. Bun's heap profile can instead be a JSC retained-heap snapshot;
    // report that distinction rather than calling retained bytes alloc_space.
    if (p.head) {
      const rows: {name:string, bytes:number}[]=[];
      function walk(n:any):number {const bytes=(n.selfSize||0)+(n.children||[]).reduce((s,c)=>s+walk(c),0);rows.push({name:label(n.callFrame),bytes});return bytes;}
      const total=walk(p.head);console.log(`Sampled allocation bytes: ${total}; samples: ${p.samples?.length ?? "unavailable"}`);
      for(const r of rows.sort((a,b)=>b.bytes-a.bytes).slice(0,20))console.log(`${r.bytes} bytes cumulative\t${r.name}`);
    } else if (p.snapshot?.meta && p.nodes) {
      const fields=p.snapshot.meta.node_fields,width=fields.length,typeIndex=fields.indexOf("name"),sizeIndex=fields.indexOf("self_size"),totals=new Map<string,{bytes:number,count:number}>();
      for(let i=0;i<p.nodes.length;i+=width){const name=p.strings[p.nodes[i+typeIndex]];const r=totals.get(name)||{bytes:0,count:0};r.bytes+=p.nodes[i+sizeIndex];r.count++;totals.set(name,r);}
      console.log('Retained heap snapshot (not cumulative allocation history):');
      const ranked = [...totals].sort((a,b)=>b[1].bytes-a[1].bytes);
      for(const [name,r] of ranked.slice(0,20))console.log(`${r.bytes} retained bytes; ${r.count} objects\t${name.replace(/\s+/g,' ').slice(0,140)}`);
      conclusions.push(`${file}: retained heap, not allocation history. Largest classes: ${ranked.slice(0,3).map(([name,r])=>`${name.replace(/\s+/g,' ').slice(0,60)} ${r.bytes} bytes/${r.count} objects`).join('; ')}.`);
    } else {console.log(`Unrecognised heap format; keys: ${Object.keys(p).slice(0,10)}`);missing=true;}
  }
}
console.log('\nProfiles cover the full site build, Bun tests, fixture build and direct resolver child. Make/shell/path-printing subprocesses, native rsvg/font tooling and browser processes are not sampled. No speed/heap regression claim without equivalent baseline runs.');
if (missing) process.exitCode = 1;
if (Bun.argv.includes('--dispose')) {
  if (missing) throw new Error('Diagnose missing captures before disposal');
  await Bun.write(join(runDir, 'profile-conclusions.md'), [
    '# Pre-release profile conclusions',
    `Bun ${Bun.version}; workload: typography, diagram audit and path isolation, with nested fixture build and resolver child.`,
    ...conclusions,
    'CPU/heap results are reviewed before disposal; short fixture samples cannot establish a performance improvement. No equivalent-workload speedup is claimed.',
    'Bun live heaps are not allocation histories. Native Make, rsvg/font and browser processes are outside capture. Raw captures and disposable logs removed after this analysis.',
  ].join('\n\n')+'\n');
  for (const file of files) if (lstatSync(join(dir,file)).isSymbolicLink()) throw new Error('Refusing profile cleanup symlink');
  rmSync(dir, {recursive:true});
}
