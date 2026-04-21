---
section: infrastructure
status: active
created: 2023-03-20
tagline: Idempotent Linux bootstrap — YAML-driven, like cloud-init for bare metal.
logo: assets/logos-opt/ground-init.png
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

## Posts
- [Reviving a MacBook Air with Fedora Silverblue](https://taoofmac.com/space/blog/2025/11/05/2200) — 2025-11-05
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; stroke-width: 1.5; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; stroke-width: 1.5; }
      .box-green { fill: #0d2220; stroke: #207060; stroke-width: 1.5; }
      .box-warm { fill: #221a10; stroke: #a06020; stroke-width: 1.5; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; stroke-width: 1.5; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: transparent; }
      .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
      .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
      .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6" stroke="none"/>
    </marker>
  </defs>
  <rect x="20" y="60" width="120" height="80" rx="8" class="box-warm"/>
  <text x="80" y="98" text-anchor="middle" class="label">YAML config</text>
  <text x="80" y="113" text-anchor="middle" class="sub">desired state</text>
  <rect x="200" y="20" width="140" height="60" rx="8" class="box-accent"/>
  <text x="270" y="55" text-anchor="middle" class="label">Parser</text>
  <text x="270" y="70" text-anchor="middle" class="sub">validate schema</text>
  <rect x="200" y="110" width="140" height="60" rx="8" class="box"/>
  <text x="270" y="145" text-anchor="middle" class="label">State cache</text>
  <text x="270" y="160" text-anchor="middle" class="sub">applied hashes</text>
  <rect x="430" y="60" width="150" height="80" rx="8" class="box-green"/>
  <text x="505" y="95" text-anchor="middle" class="label">Idempotent</text>
  <text x="505" y="112" text-anchor="middle" class="label">executor</text>
  <text x="505" y="127" text-anchor="middle" class="sub">pkg/file/svc</text>
  <linex1="140" y1="100" x2="200" y2="80" stroke-width="1.5" marker-end="url(#ahs)"/ stroke="#3b82f6"/>
  <linex1="340" y1="80" x2="430" y2="80" stroke-width="1.5" marker-end="url(#ah)"/ stroke="#5070a0"/>
  <linex1="340" y1="140" x2="430" y2="120" stroke-width="1.5" marker-end="url(#ah)"/ stroke="#5070a0"/>
</svg>
