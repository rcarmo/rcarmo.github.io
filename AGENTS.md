<!-- RUI-PROFILE-LIFECYCLE-20261005 -->
## Current profiling and cleanup rule — supersedes older text below

Rui's explicit rule: **profile and tune during pre-release tests; remove profiling data immediately after analysis/use.** Ordinary development tests do not require profiling on every run. Targeted diagnostic profiling is optional when useful and follows the same disposal rule.

- During pre-release verification, capture CPU and heap/allocation behaviour, analyse hotspots and tune avoidable allocations/repeated work. Compare equivalent workloads without weakening correctness/security/numerical contracts. For Go, inspect CPU, alloc_space and alloc_objects; coverage alone is not profiling.
- Keep captures and matching artifacts only while the current analysis needs them. Once used, immediately delete raw profiles, traces, matching test binaries, temporary fixtures and disposable logs, including failed/probe artifacts after diagnosis. Retain only concise conclusions and important measurements/limitations. Do not keep indefinite raw archives or copy them into exports/reports/evidence to evade cleanup.
- Remove all completed disposable cache/build/test/run data promptly. Never delete files still in use: finish or safely pause the owning job and clean at a safe boundary. Preserve source, installed toolchains, durable datasets/checkpoints and intentional release assets. Minimise disk usage; no random exports or redundant snapshots.
- This rule overrides **every conflicting older paragraph in this file and linked local guidance**, including “profile every test”, “unprofiled tests prohibited”, “retain all raw evidence”, “never delete profiles” and cleanup exclusions based only on an evidence/profiles directory name. Update helper/CI cleanup behaviour accordingly; do not weaken pre-release analysis.
- Existing no-agent-contact and execution-pause rules remain unchanged. This policy grants no unsolicited coordination or automatic job restart.
<!-- /RUI-PROFILE-LIFECYCLE-20261005 -->



# Portfolio tooling

## Source and output

`_content/`, `_diagrams/` and curated assets are source. Never edit generated HTML or remove curated assets as cleanup. `build.ts` stages a complete publishable site outside the checkout; it does not update tracked `assets/og` snapshots.

## Project-owned temporary paths

Canonical project name: `rcarmo.github.io`. Snapshot the inherited `TMPDIR` once as `PROJECT_ORIGINAL_TMPDIR`, before any child-temp redirection. An absolute `PROJECT_TMP_BASE` selects `<base>/rcarmo.github.io`; the compatibility override `PROJECT_TMP_ROOT` must be absolute and end in `rcarmo.github.io`. Both supplied overrides must select the same root. Empty, relative, conflicting, unusable or symlinked overrides fail without fallback; existing project roots must be owned and writable.

Without an override, CI selects usable `RUNNER_TEMP`, then the original inherited `TMPDIR`, then system temp, **even when `/workspace/tmp` exists**. Local runs prefer writable `/workspace/tmp`, then system temp; they do not select incidental `RUNNER_TEMP` or `TMPDIR` values. Always append `rcarmo.github.io` (POSIX fallback `/tmp/rcarmo.github.io`; macOS uses `/private/tmp` to avoid the `/tmp` symlink). Export the resolved `PROJECT_TMP_ROOT` to children to prevent recursive nesting. Never use a bare fallback directory or home cache. On this host local runs resolve to `/workspace/tmp/rcarmo.github.io/`:

* `cache/bun`, `cache/npm`, `cache/xdg`, `cache/playwright`: downloadable/rebuildable caches.
* `build/<encoded-checkout-path>/site`: generated HTML, copied static assets and generated social cards. Each checkout has its own build directory. Do not run two builds/cleanups concurrently in one checkout; use separate worktrees or a run-local site for concurrent jobs.
* `tests/` and `logs/`: reserved stable roots for disposable test/log scratch; current invocation logs and isolated fixtures are kept together beneath `runs/`.
* `runs/<purpose>/<run-id>`: isolated scratch, test fixtures and browser profiles. `TMPDIR`, `TMP` and `TEMP` point here.

`Makefile` exports `BUN_INSTALL_CACHE_DIR`, `npm_config_cache`, `XDG_CACHE_HOME`, `PLAYWRIGHT_BROWSERS_PATH`, `TMPDIR`, `TMP` and `TEMP`. `project-paths.ts` applies the same routing for direct Bun entrypoints and subprocesses. Use Make targets for routine work. Do not set raw `/tmp`, home caches or new top-level scratch directories.

Hosted CI uses the same repo-local resolver and exports `PROJECT_ORIGINAL_TMPDIR` and `PROJECT_TMP_ROOT` (normally `${RUNNER_TEMP}/rcarmo.github.io`), preserving the identical `{cache,build,tests,logs,runs}` hierarchy. It does not depend on `/workspace/Makefile` or any host helper. Installed toolchains and dependencies are not disposable project caches. The source checkout and maintained legacy demo bundles (`textile`, `wisp`) are source/publication assets, not temporary build output.

The path helper checks ownership and symlink components. Tests use isolated current-run fixtures; PORTFOLIO_SITE_DIR must stay under this project build/run tree, never overlap source. Clean generated sites and all other completed disposable caches/runs/profiles after use, after checking inactivity. Preserve source assets, durable data, concise conclusions, active work and other projects.

## Verification and profiles

* `make build`: stage the site; `make paths`: show exact paths.
* `make test`: ordinary development tests.
* `make test-profile`: pre-release full-site build plus tests, with CPU and live-heap captures for the build, test process and nested children. Analyse the summaries, retain concise conclusions and dispose raw captures immediately after use.
* `make audit`: links, style and deterministic diagrams; reports go into the current run.
* `make browser-install` then `make audit-browser`: Playwright binaries use the project cache; browser scratch uses the run directory.

Pre-release captures live under the current run's `profiles/`. `make test-profile` writes concise conclusions and deletes successful raw captures/logs after analysis. Failed captures are retained only until diagnosis, then disposed. Never copy executables/source trees or archive profiles as evidence. CI publishes concise conclusions in its job summary and cleans its run after deployment. Native/browser/subprocess exclusions and missing/short samples must be reported. Live snapshots are not allocation histories. Ordinary development tests may run without capture.

## Publication

Use `make build` and publish only the staged site. Local pushes use `/workspace/Makefile` with `BRANCH=master` and command-scoped `$GITHUB_PICLAW_BOT` injection. Merge-only pulls; author commits as Rui Carmo <rui.carmo@gmail.com>. A `v*` tag triggers deployment. Do not publish without authorisation.
