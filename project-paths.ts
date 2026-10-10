import { existsSync, lstatSync, mkdirSync, readdirSync, realpathSync, rmSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";

import { resolveScratchRoot, usablePath } from "./scratch-root";
export const sourceRoot = import.meta.dir;
export const tempRoot = resolveScratchRoot();
process.env.PROJECT_TMP_ROOT = tempRoot;
export function within(parent: string, child: string): boolean {
  const rel = relative(parent, child);
  return rel !== "" && rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
}

/** Refuse symlink components and foreign-owned project directories. */
export function ownedDirectory(path: string): void {
  const target = resolve(path);
  if (!usablePath(target)) throw new Error(`Unsafe or symlink path refused: ${target}`);
  mkdirSync(target, { recursive: true });
  const st = lstatSync(target);
  if (!st.isDirectory() || (process.getuid && st.uid !== process.getuid())) throw new Error(`Unowned directory: ${target}`);
}
ownedDirectory(tempRoot);
for (const name of ["cache", "build", "tests", "logs", "runs"]) ownedDirectory(join(tempRoot, name));
const checkoutKey = Buffer.from(sourceRoot).toString("hex");
export const buildRoot = join(tempRoot, "build", ...(checkoutKey.match(/.{1,120}/g) || []));
const requestedRun = process.env.PORTFOLIO_RUN_DIR;
export const runDir = resolve(requestedRun || join(tempRoot, "runs", "direct", `${Date.now()}-${process.pid}-${crypto.randomUUID()}`));
if (!within(join(tempRoot, "runs"), runDir)) throw new Error("Run directory must be inside project runs/");
ownedDirectory(runDir);
export const siteRoot = resolve(process.env.PORTFOLIO_SITE_DIR || join(buildRoot, "site"));
const physicalSource = resolve(sourceRoot);
// Bun resolves module paths physically; /workspace can be a mount alias. Treat
// a fixture under either spelling of the run root as an isolated source tree.
const fixtureSource = within(runDir, sourceRoot) || within(realpathSync(runDir), physicalSource);
if (!(within(join(tempRoot, "build"), siteRoot) || within(runDir, siteRoot)) || siteRoot === sourceRoot || within(siteRoot, sourceRoot) || (within(sourceRoot, siteRoot) && !fixtureSource)) {
  throw new Error("Site output must be inside project build/ or this run, separate from source");
}
for (const path of [runDir, buildRoot, siteRoot]) ownedDirectory(path);
for (const [key, path] of Object.entries({
  TMPDIR: runDir, TMP: runDir, TEMP: runDir,
  XDG_CACHE_HOME: join(tempRoot, "cache/xdg"),
  BUN_INSTALL_CACHE_DIR: join(tempRoot, "cache/bun"),
  npm_config_cache: join(tempRoot, "cache/npm"),
  PLAYWRIGHT_BROWSERS_PATH: join(tempRoot, "cache/playwright"),
})) {
  ownedDirectory(path);
  process.env[key] = path;
}
process.env.PORTFOLIO_RUN_DIR = runDir;
process.env.PORTFOLIO_SITE_DIR = siteRoot;

function removeOwnedSite(): void {
  if (!existsSync(siteRoot)) return;
  function check(path: string): void {
    const st = lstatSync(path);
    if (st.isSymbolicLink() || (process.getuid && st.uid !== process.getuid())) throw new Error(`Unsafe cleanup: ${path}`);
    if (st.isDirectory()) for (const name of readdirSync(path)) check(join(path, name));
  }
  check(siteRoot);
  rmSync(siteRoot, { recursive: true });
}
// Reset only output already confined to this checkout's build or a test run.
export function prepareSite(): void {
  removeOwnedSite();
  ownedDirectory(siteRoot);
}
// User cleanup is narrower still: never another checkout/run, caches or evidence.
export function cleanSite(): void {
  if (siteRoot !== join(buildRoot, "site")) throw new Error("Clean only supports this checkout's default site");
  removeOwnedSite();
}
if (import.meta.main) {
  if (Bun.argv.includes("--clean")) cleanSite();
  else console.log(JSON.stringify({ tempRoot, runDir, siteRoot }));
}
