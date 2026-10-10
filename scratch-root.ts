import { accessSync, constants, existsSync, lstatSync } from "node:fs";
import { basename, dirname, isAbsolute, join, resolve } from "node:path";

export const projectName = "rcarmo.github.io";
// Snapshot before any entrypoint redirects TMPDIR. An intentionally empty
// snapshot stays empty in descendants rather than becoming their run directory.
if (process.env.PROJECT_ORIGINAL_TMPDIR === undefined) {
  process.env.PROJECT_ORIGINAL_TMPDIR = process.env.TMPDIR || "";
}
export function isCI(env: Record<string, string | undefined>): boolean {
  const value = env.CI;
  return (!!value && !/^(0|false)$/i.test(value)) ||
    [env.GITHUB_ACTIONS, env.GITLAB_CI, env.TF_BUILD, env.CIRCLECI].some(v => /^true$/i.test(v || ""));
}
function absolutePath(path: string): boolean {
  return isAbsolute(path) && !path.split(/[\\/]/).some(p => p === "." || p === "..");
}
export function usablePath(path: string): boolean {
  if (!absolutePath(path)) return false;
  try {
    for (let part = path; ; part = dirname(part)) {
      try { if (lstatSync(part).isSymbolicLink() && part !== "/workspace") return false; }
      catch (e) { if ((e as NodeJS.ErrnoException).code !== "ENOENT") return false; }
      if (dirname(part) === part) break;
    }
    if (existsSync(path)) {
      const st=lstatSync(path);
      if (!st.isDirectory() || (process.getuid && st.uid !== process.getuid())) return false;
    }
    let ancestor=path;
    while(!existsSync(ancestor)) ancestor=dirname(ancestor);
    if(!lstatSync(ancestor).isDirectory() && ancestor !== "/workspace") return false;
    accessSync(ancestor,constants.W_OK|constants.X_OK);
    return true;
  } catch {return false;}
}

// Resolve once, before callers replace TMPDIR with an owned per-run directory.
// Injectable probes let tests simulate unavailable workspace/runner paths.
export function resolveScratchRoot(
  env: Record<string,string|undefined> = process.env,
  options: {workspaceBase?: string; platformTemp?: string; usable?: (path:string)=>boolean} = {},
): string {
  const usable=options.usable||usablePath;
  let explicitBaseRoot: string | undefined;
  if (env.PROJECT_TMP_BASE !== undefined) {
    const base = env.PROJECT_TMP_BASE;
    if (!absolutePath(base) || !usable(join(base, projectName))) throw new Error("PROJECT_TMP_BASE must be a usable absolute base, without symlinks");
    explicitBaseRoot = resolve(base, projectName);
  }
  if (env.PROJECT_TMP_ROOT !== undefined) {
    const path=env.PROJECT_TMP_ROOT.replace(/[\\/]+$/, "");
    if (!absolutePath(path) || basename(path)!==projectName || !usable(path)) throw new Error("PROJECT_TMP_ROOT must be a writable absolute directory ending in rcarmo.github.io, without symlinks");
    const root = resolve(path);
    if (explicitBaseRoot && root !== explicitBaseRoot) throw new Error("Conflicting PROJECT_TMP_BASE and PROJECT_TMP_ROOT");
    return root;
  }
  if (explicitBaseRoot) return explicitBaseRoot;
  // System fallback must not consult redirected TMPDIR or TMP/TEMP. On POSIX
  // it is /tmp; Darwin's canonical spelling avoids the /tmp symlink.
  const platform = options.platformTemp ?? (process.platform === "win32"
    ? join(env.SystemRoot || "C:\\Windows", "Temp") : process.platform === "darwin" ? "/private/tmp" : "/tmp");
  const bases = isCI(env)
    ? [env.RUNNER_TEMP, env.PROJECT_ORIGINAL_TMPDIR ?? env.TMPDIR, platform]
    : [options.workspaceBase ?? "/workspace/tmp", platform];
  for (const base of bases) {
    if (!base || !absolutePath(base)) continue;
    // Do not create an absent workspace mount on ordinary hosts.
    if (!options.usable && base === "/workspace/tmp" && !existsSync(dirname(base))) continue;
    const path = join(base, projectName);
    if (usable(path)) return resolve(path);
  }
  throw new Error("No writable project-owned temporary root available");
}
if(import.meta.main) console.log(resolveScratchRoot());
