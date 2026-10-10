#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
: "${PORTFOLIO_RUN_DIR:?Use make test-profile}"
export PORTFOLIO_PROFILE_DIR="$PORTFOLIO_RUN_DIR/profiles"
bun -e 'const p=await import("./project-paths"); const dir=process.env.PORTFOLIO_PROFILE_DIR!; if(!p.within(p.runDir,dir))throw Error("Profile directory must be run-owned");p.ownedDirectory(dir);'
# Keep raw CPU/heap captures only until their analysis is complete. A successful
# analysis writes concise conclusions outside the profile directory and disposes
# the captures immediately. Failures preserve this run only for diagnosis.
status=0
bun --cpu-prof --cpu-prof-interval=100 --cpu-prof-dir="$PORTFOLIO_PROFILE_DIR" --cpu-prof-name=site-build.cpuprofile \
    --heap-prof --heap-prof-dir="$PORTFOLIO_PROFILE_DIR" --heap-prof-name=site-build.heapprofile \
    build.ts > "$PORTFOLIO_PROFILE_DIR/build.log" 2>&1 || status=$?
cat "$PORTFOLIO_PROFILE_DIR/build.log"
if test "$status" != 0; then echo "Diagnose failed build in $PORTFOLIO_PROFILE_DIR and dispose afterwards"; exit "$status"; fi
bun test --preload ./scripts/test-profiler.ts typography.test.ts audit-diagrams.test.ts project-paths.test.ts > "$PORTFOLIO_PROFILE_DIR/tests.log" 2>&1 || status=$?
cat "$PORTFOLIO_PROFILE_DIR/tests.log"
analysis=0
bun scripts/profile-summary.ts "$PORTFOLIO_PROFILE_DIR" || analysis=$?
if test "$status" != 0; then echo "Diagnose failed tests in $PORTFOLIO_PROFILE_DIR and dispose afterwards"; exit "$status"; fi
if test "$analysis" != 0; then echo "Diagnose captures in $PORTFOLIO_PROFILE_DIR and dispose afterwards"; exit "$analysis"; fi
bun scripts/profile-summary.ts "$PORTFOLIO_PROFILE_DIR" --dispose >/dev/null
printf 'Concise conclusions: %s/profile-conclusions.md; raw captures disposed\n' "$PORTFOLIO_RUN_DIR"
