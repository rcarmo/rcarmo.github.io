SHELL := /bin/bash
.DEFAULT_GOAL := help
ROOT := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))
# Snapshot the incoming TMPDIR before replacing it with per-run scratch.
ifeq ($(origin PROJECT_ORIGINAL_TMPDIR),undefined)
PROJECT_ORIGINAL_TMPDIR := $(TMPDIR)
endif
export PROJECT_ORIGINAL_TMPDIR
# Forward explicit Make overrides (including empty/invalid values) to the
# resolver. Quoting keeps paths literal; never silently fall back on an error.
shellquote = '$(subst ','"'"',$(1))'
RESOLVER_ENV := PROJECT_ORIGINAL_TMPDIR=$(call shellquote,$(PROJECT_ORIGINAL_TMPDIR))
ifneq ($(origin PROJECT_TMP_BASE),undefined)
RESOLVER_ENV += PROJECT_TMP_BASE=$(call shellquote,$(PROJECT_TMP_BASE))
endif
ifneq ($(origin PROJECT_TMP_ROOT),undefined)
RESOLVER_ENV += PROJECT_TMP_ROOT=$(call shellquote,$(PROJECT_TMP_ROOT))
endif
RESOLVED_TMP_ROOT := $(shell cd "$(ROOT)" && $(RESOLVER_ENV) bun scratch-root.ts)
ifeq ($(strip $(RESOLVED_TMP_ROOT)),)
$(error Unable to resolve project temporary root)
endif
export PROJECT_TMP_ROOT := $(RESOLVED_TMP_ROOT)
TMP_ROOT := $(RESOLVED_TMP_ROOT)
CHECKOUT_KEY := $(shell printf '%s' '$(ROOT)' | od -An -v -tx1 | tr -d ' \n' | fold -w120 | paste -sd/ -)
ifndef PORTFOLIO_RUN_DIR
PORTFOLIO_RUN_DIR := $(TMP_ROOT)/runs/make/$(shell date -u +%Y%m%dT%H%M%S)-$(shell bun -e 'console.log(crypto.randomUUID())')
endif
export PORTFOLIO_RUN_DIR
export TMPDIR := $(PORTFOLIO_RUN_DIR)
export TMP := $(TMPDIR)
export TEMP := $(TMPDIR)
export XDG_CACHE_HOME := $(TMP_ROOT)/cache/xdg
export BUN_INSTALL_CACHE_DIR := $(TMP_ROOT)/cache/bun
export npm_config_cache := $(TMP_ROOT)/cache/npm
export PLAYWRIGHT_BROWSERS_PATH := $(TMP_ROOT)/cache/playwright
export PORTFOLIO_SITE_DIR := $(TMP_ROOT)/build/$(CHECKOUT_KEY)/site
# Raw captures are disposable run scratch, not archives.
export PORTFOLIO_PROFILE_ROOT := $(PORTFOLIO_RUN_DIR)/profiles

.PHONY: help paths init build test test-profile audit audit-browser browser-install clean
help:
	@printf '%s\n' 'build: stage the publishable site outside source' 'test: development tests' 'test-profile: pre-release CPU/heap capture for immediate analysis and disposal' 'audit: link/style/diagram reports in current run' 'audit-browser: browser diagram checks' 'browser-install: install project-scoped Chromium' 'paths: print configured paths' 'clean: remove only this checkout staged site (not caches, runs or evidence)'
paths:
	@printf '%s\n' 'TMP_ROOT=$(TMP_ROOT)' 'RUN_DIR=$(PORTFOLIO_RUN_DIR)' 'ORIGINAL_TMPDIR=$(PROJECT_ORIGINAL_TMPDIR)' 'SITE_DIR=$(PORTFOLIO_SITE_DIR)' 'PROFILE_ROOT=$(PORTFOLIO_PROFILE_ROOT)'
init:
	@cd "$(ROOT)" && bun project-paths.ts
build: init
	@cd "$(ROOT)" && bun build.ts
test: init
	@cd "$(ROOT)" && bun test typography.test.ts audit-diagrams.test.ts project-paths.test.ts
test-profile: init
	@cd "$(ROOT)" && bash scripts/test-profile.sh
audit: init
	@cd "$(ROOT)" && bun audit-links.ts | tee "$(PORTFOLIO_RUN_DIR)/links.log"; exit $${PIPESTATUS[0]}
	@cd "$(ROOT)" && bun audit-style.ts > "$(PORTFOLIO_RUN_DIR)/style.json"
	@cd "$(ROOT)" && bun audit-diagrams.ts > "$(PORTFOLIO_RUN_DIR)/diagrams.json"
audit-browser: init
	@cd "$(ROOT)" && bun audit-diagrams.ts --browser > "$(PORTFOLIO_RUN_DIR)/diagrams-browser.json"
browser-install: init
	@cd "$(ROOT)" && bun x --no-install playwright install chromium
clean: init
	@cd "$(ROOT)" && bun project-paths.ts --clean
