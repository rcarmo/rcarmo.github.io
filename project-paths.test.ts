import { expect, test } from "bun:test";
import { chmodSync, existsSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { buildRoot, ownedDirectory, runDir, siteRoot, tempRoot, within } from "./project-paths";
import { isCI, projectName, resolveScratchRoot } from "./scratch-root";

test("cache, build and temp settings are project-scoped", () => {
  expect(tempRoot.endsWith("/rcarmo.github.io")).toBe(true);
  expect(within(join(tempRoot, "runs"), runDir)).toBe(true);
  expect(within(buildRoot, siteRoot)).toBe(true);
  expect(process.env.PROJECT_TMP_ROOT).toBe(tempRoot);
  expect(process.env.PROJECT_ORIGINAL_TMPDIR).toBeDefined();
  for (const name of ["cache", "build", "tests", "logs", "runs"]) expect(existsSync(join(tempRoot, name))).toBe(true);
  for (const key of ["TMPDIR", "TMP", "TEMP"]) expect(process.env[key]).toBe(runDir);
  for (const key of ["XDG_CACHE_HOME", "BUN_INSTALL_CACHE_DIR", "npm_config_cache", "PLAYWRIGHT_BROWSERS_PATH"]) {
    expect(within(join(tempRoot, "cache"), process.env[key]!)).toBe(true);
  }
  expect(within(tempRoot, tempRoot)).toBe(false);
  expect(within(tempRoot, tempRoot + "-other/child")).toBe(false);
});

test("owned roots reject symlinks without modifying the target", () => {
  const dir=mkdtempSync(join(runDir,"path-isolation-"));
  try {
    const target=join(dir,"target");ownedDirectory(target);
    symlinkSync(target,join(dir,"link"));
    expect(()=>ownedDirectory(join(dir,"link","child"))).toThrow("symlink path refused");
    expect(existsSync(join(target,"child"))).toBe(false);
  } finally {rmSync(dir,{recursive:true,force:true});}
});

const projectPath = (base: string) => join(base, projectName);
const probes = (bases: string[]) => ({ platformTemp: "/system", usable: (path: string) => bases.map(projectPath).includes(path) });

test("local fallback ignores runner and inherited TMPDIR", () => {
  const env = { RUNNER_TEMP: "/runner", TMPDIR: "/incoming", PROJECT_ORIGINAL_TMPDIR: "/original" };
  expect(resolveScratchRoot(env, probes(["/workspace/tmp", "/runner", "/original", "/system"]))).toBe(projectPath("/workspace/tmp"));
  expect(resolveScratchRoot(env, probes(["/runner", "/original", "/incoming", "/system"]))).toBe(projectPath("/system"));
  expect(() => resolveScratchRoot(env, probes(["/runner", "/original", "/incoming"]))).toThrow("No writable");
});

test("CI precedence ignores a usable workspace", () => {
  const env = { CI: "true", RUNNER_TEMP: "/runner", TMPDIR: "/redirected/run", PROJECT_ORIGINAL_TMPDIR: "/original" };
  expect(resolveScratchRoot(env, probes(["/workspace/tmp", "/runner", "/original", "/system"]))).toBe(projectPath("/runner"));
  expect(resolveScratchRoot(env, probes(["/workspace/tmp", "/original", "/system"]))).toBe(projectPath("/original"));
  expect(resolveScratchRoot(env, probes(["/workspace/tmp", "/system"]))).toBe(projectPath("/system"));
  expect(() => resolveScratchRoot(env, probes(["/workspace/tmp", "/redirected/run"]))).toThrow("No writable");
  expect(resolveScratchRoot({ CI: "1", TMPDIR: "/incoming" }, probes(["/incoming", "/system"]))).toBe(projectPath("/incoming"));
  expect(resolveScratchRoot({ CI: "1", TMPDIR: "/redirected", PROJECT_ORIGINAL_TMPDIR: "" }, probes(["/redirected", "/system"]))).toBe(projectPath("/system"));
  expect(resolveScratchRoot({ CI: "1", RUNNER_TEMP: "relative", TMPDIR: "/original" }, probes(["/original"]))).toBe(projectPath("/original"));
});

test("common CI flags and disabled CI values", () => {
  for (const value of [undefined, "", "0", "false", "FALSE"]) expect(isCI({ CI: value })).toBe(false);
  for (const value of ["1", "true", "yes"]) expect(isCI({ CI: value })).toBe(true);
  for (const key of ["GITHUB_ACTIONS", "GITLAB_CI", "TF_BUILD", "CIRCLECI"]) {
    expect(isCI({ CI: "false", [key]: "True" })).toBe(true);
    expect(isCI({ [key]: "false" })).toBe(false);
  }
});

test("explicit base and compatible root override both fallback policies", () => {
  for (const CI of ["true", "false"]) {
    const defaults = { CI, RUNNER_TEMP: "/runner", TMPDIR: "/original" };
    const usable = probes(["/owned", "/workspace/tmp", "/runner", "/original", "/system"]);
    expect(resolveScratchRoot({ ...defaults, PROJECT_TMP_BASE: "/owned/" }, usable)).toBe(projectPath("/owned"));
    expect(resolveScratchRoot({ ...defaults, PROJECT_TMP_ROOT: projectPath("/owned") + "/" }, usable)).toBe(projectPath("/owned"));
    expect(resolveScratchRoot({ ...defaults, PROJECT_TMP_BASE: "/owned", PROJECT_TMP_ROOT: projectPath("/owned") }, usable)).toBe(projectPath("/owned"));
    expect(() => resolveScratchRoot({ ...defaults, PROJECT_TMP_BASE: "/owned", PROJECT_TMP_ROOT: projectPath("/runner") }, usable)).toThrow("Conflicting");
  }
});

test("invalid explicit overrides fail even if fallback is writable", () => {
  for (const path of ["", "relative", "/owned/../base", "/owned/./base"]) {
    expect(() => resolveScratchRoot({ PROJECT_TMP_BASE: path }, { usable: () => true })).toThrow("PROJECT_TMP_BASE");
  }
  for (const path of ["", "relative/rcarmo.github.io", "/owned/other", "/bad/../rcarmo.github.io"]) {
    expect(() => resolveScratchRoot({ PROJECT_TMP_ROOT: path }, { usable: () => true })).toThrow("PROJECT_TMP_ROOT");
  }
  expect(() => resolveScratchRoot({ PROJECT_TMP_BASE: "/blocked" }, probes(["/workspace/tmp", "/system"]))).toThrow("PROJECT_TMP_BASE");
  expect(() => resolveScratchRoot({ PROJECT_TMP_ROOT: projectPath("/blocked") }, probes(["/workspace/tmp", "/system"]))).toThrow("PROJECT_TMP_ROOT");
  expect(() => resolveScratchRoot({ PROJECT_TMP_BASE: "", PROJECT_TMP_ROOT: projectPath("/owned") }, probes(["/owned"]))).toThrow("PROJECT_TMP_BASE");
  expect(() => resolveScratchRoot({ PROJECT_TMP_BASE: "/owned", PROJECT_TMP_ROOT: "" }, probes(["/owned"]))).toThrow("PROJECT_TMP_ROOT");
});

test("exported root prevents nested project directories on child resolution", () => {
  const root = resolveScratchRoot({ CI: "true", RUNNER_TEMP: "/runner" }, probes(["/runner"]));
  expect(resolveScratchRoot({ CI: "true", PROJECT_TMP_ROOT: root, TMPDIR: root + "/runs/child", PROJECT_ORIGINAL_TMPDIR: "/original" }, probes(["/runner"]))).toBe(root);
});

test("Make and direct entrypoints agree on exported roots and original TMPDIR", () => {
  const dir = mkdtempSync(join(runDir, "entrypoints-"));
  const profileDir = process.env.PORTFOLIO_PROFILE_DIR;
  try {
    const base = join(dir, "base with spaces"), original = join(dir, "original");
    mkdirSync(base); mkdirSync(original);
    const env = { ...process.env };
    for (const key of ["PROJECT_TMP_BASE", "PROJECT_TMP_ROOT", "PROJECT_ORIGINAL_TMPDIR", "PORTFOLIO_RUN_DIR", "PORTFOLIO_SITE_DIR", "MAKEFLAGS", "MFLAGS", "MAKELEVEL"]) delete env[key];
    Object.assign(env, { TMPDIR: original, CI: "true", RUNNER_TEMP: join(dir, "runner") });
    // Make's native shell processes are outside JSC profiling; only path
    // resolution/printing runs here, never an unprofiled test worker.
    const makeArgs = ["make", "--no-print-directory", "paths", `PROJECT_TMP_BASE=${base}`];
    const make = Bun.spawnSync(makeArgs, { cwd: import.meta.dir, env, stdout: "pipe", stderr: "pipe" });
    expect(make.exitCode, make.stderr.toString()).toBe(0);
    expect(make.stdout.toString()).toContain(`TMP_ROOT=${base}/${projectName}`);
    expect(make.stdout.toString()).toContain(`ORIGINAL_TMPDIR=${original}`);
    const conflict = Bun.spawnSync([...makeArgs, `PROJECT_TMP_ROOT=${dir}/${projectName}`], { cwd: import.meta.dir, env, stdout: "pipe", stderr: "pipe" });
    expect(conflict.exitCode).not.toBe(0);
    expect(conflict.stderr.toString()).toContain("Conflicting PROJECT_TMP_BASE and PROJECT_TMP_ROOT");
    const directEnv = { ...env, PROJECT_TMP_BASE: base };
    const profileArgs = profileDir ? ["--cpu-prof", "--cpu-prof-interval=100", `--cpu-prof-dir=${profileDir}`, "--cpu-prof-name=resolver-child.cpuprofile", "--heap-prof", `--heap-prof-dir=${profileDir}`, "--heap-prof-name=resolver-child.heapprofile"] : [];
    const args = [process.execPath, ...profileArgs, "-e", 'const p=await import("./project-paths.ts"); const r=await import("./scratch-root.ts"); console.log(JSON.stringify({root:p.tempRoot,original:process.env.PROJECT_ORIGINAL_TMPDIR,child:r.resolveScratchRoot(),scratch:process.env.TMPDIR}));'];
    if (profileDir) writeFileSync(join(profileDir, "resolver-child-command.json"), JSON.stringify({args, base, original, makeArgs}, null, 2));
    const child = Bun.spawnSync(args, { cwd: import.meta.dir, env: directEnv, stdout: "pipe", stderr: "pipe" });
    expect(child.exitCode, child.stderr.toString()).toBe(0);
    const actual = JSON.parse(child.stdout.toString());
    expect(actual.root).toBe(resolve(base, projectName));
    expect(actual.original).toBe(original);
    expect(actual.child).toBe(actual.root);
    expect(within(join(actual.root, "runs"), actual.scratch)).toBe(true);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("real overrides preserve filesystem isolation, symlink and permission checks", () => {
  const dir = mkdtempSync(join(runDir, "resolver-"));
  try {
    const base = join(dir, "base"); mkdirSync(base);
    const root = join(base, projectName);
    expect(resolveScratchRoot({ PROJECT_TMP_BASE: base })).toBe(root);
    expect(existsSync(root)).toBe(false); // resolution itself does not mutate
    ownedDirectory(root);
    expect(resolveScratchRoot({ PROJECT_TMP_BASE: base, PROJECT_TMP_ROOT: root })).toBe(root);
    const link = join(dir, "linked"); symlinkSync(base, link);
    expect(() => resolveScratchRoot({ PROJECT_TMP_BASE: link })).toThrow("PROJECT_TMP_BASE");
    expect(() => resolveScratchRoot({ PROJECT_TMP_ROOT: join(link, projectName) })).toThrow("PROJECT_TMP_ROOT");
    const dangling = join(dir, "dangling"); symlinkSync(join(dir, "absent"), dangling);
    expect(() => resolveScratchRoot({ PROJECT_TMP_BASE: dangling })).toThrow("PROJECT_TMP_BASE");
    const file = join(dir, "file"); writeFileSync(file, "not a directory");
    expect(() => resolveScratchRoot({ PROJECT_TMP_BASE: file })).toThrow("PROJECT_TMP_BASE");
    if (process.getuid?.() !== 0) {
      chmodSync(root, 0o500);
      expect(() => resolveScratchRoot({ PROJECT_TMP_ROOT: root })).toThrow("PROJECT_TMP_ROOT");
      chmodSync(root, 0o700);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
