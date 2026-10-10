import "../project-paths";
import { afterAll } from "bun:test";
import { startSamplingProfiler, samplingProfilerStackTraces, heapStats } from "bun:jsc";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
const dir=process.env.PORTFOLIO_PROFILE_DIR;
if(!dir)throw new Error("Use make test for retained CPU/heap capture");
// Bun 1.4 test CLI ignores run-mode profile flags. Use the JSC sampler directly.
startSamplingProfiler(undefined,100);
const initial=heapStats();
afterAll(()=>{
  // Snapshot before serialising CPU traces so the report strings do not
  // become artificial heap hotspots in the workload snapshot.
  const heap=Bun.generateHeapSnapshot("v8");
  writeFileSync(join(dir,"tests.heapprofile"),typeof heap === "string" ? heap : JSON.stringify(heap));
  const stacks=samplingProfilerStackTraces();
  writeFileSync(join(dir,"tests.jsc-cpu.json"),JSON.stringify(stacks));
  writeFileSync(join(dir,"tests-heap-stats.json"),JSON.stringify({initial,final:heapStats()},null,2));
});
