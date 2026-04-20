---
section: infrastructure
status: active
tagline: Idempotent Linux bootstrap — YAML-driven, like cloud-init for bare metal.
---

## About
ground-init takes a YAML config and applies declarative steps to a fresh Linux install: packages, users, files, services. Each step checks current state before acting. Pure Python 3 stdlib, no dependencies.

## How it works
Each YAML step is a desired-state declaration. The script checks whether the current state matches before doing anything — installed packages are skipped, files with correct content are left alone. Re-running verifies state without unwanted changes. Covers apt/rpm-ostree packages, file contents, user creation, systemd services, git clones, and shell scripts.

## Features
### 📄 Idempotent YAML
Desired-state declarations. Run twice: setup and verify.

### 🐧 Ubuntu, Debian, Fedora Silverblue
apt and rpm-ostree support.

### 📦 Zero dependencies
Pure Python 3 stdlib.
