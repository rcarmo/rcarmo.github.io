import { runDir, tempRoot, within } from '../project-paths';
import { lstatSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
// Invoke only after the owning job has finished using its run (CI always-step).
if (!within(join(tempRoot, 'runs'), runDir)) throw new Error('Invalid run cleanup');
function check(path: string): void {
  const st=lstatSync(path);
  if(st.isSymbolicLink() || (process.getuid && st.uid!==process.getuid())) throw new Error('Unsafe run cleanup: '+path);
  if(st.isDirectory())for(const entry of readdirSync(path))check(join(path,entry));
}
check(runDir);
rmSync(runDir,{recursive:true});
