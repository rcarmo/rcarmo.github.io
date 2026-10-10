rcarmo.github.io
================

My little corner.

Build with `make build`; `make paths` prints the staged site location. Output lives under `/workspace/tmp/rcarmo.github.io/build/`, not in this checkout. Run `make test` for development tests or `make test-profile` for profiled pre-release verification and `make audit` for link, style and diagram checks. `make browser-install` and `make audit-browser` use the project-owned Playwright cache.

See [AGENTS.md](AGENTS.md) for cache/temp paths, profile analysis and immediate disposal, CI mapping and cleanup boundaries. `make clean` removes only this checkout's staged site. Curated assets and the maintained `textile`/`wisp` demos stay in source; deployment publishes the staged site via a `v*` tag.
