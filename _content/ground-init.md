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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 220">
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

  <rect x="20" y="76" width="140" height="68" rx="8" class="box-warm"/>
  <text x="90" y="104" text-anchor="middle" class="label">YAML config</text>
  <text x="90" y="121" text-anchor="middle" class="sub">desired state</text>

  <rect x="230" y="76" width="170" height="68" rx="8" class="box-accent"/>
  <text x="315" y="104" text-anchor="middle" class="label">ground-init</text>
  <text x="315" y="121" text-anchor="middle" class="sub">check current state first</text>

  <rect x="470" y="24" width="160" height="56" rx="8" class="box-green"/>
  <text x="550" y="48" text-anchor="middle" class="label">Packages</text>
  <text x="550" y="65" text-anchor="middle" class="sub">apt / rpm-ostree</text>

  <rect x="470" y="84" width="160" height="56" rx="8" class="box"/>
  <text x="550" y="108" text-anchor="middle" class="label">Files + users</text>
  <text x="550" y="125" text-anchor="middle" class="sub">content, ownership, accounts</text>

  <rect x="470" y="144" width="160" height="56" rx="8" class="box-purple"/>
  <text x="550" y="168" text-anchor="middle" class="label">Services + scripts</text>
  <text x="550" y="185" text-anchor="middle" class="sub">systemd, git, shell hooks</text>

  <line x1="160" y1="110" x2="226" y2="110" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="400" y1="110" x2="466" y2="52" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="400" y1="110" x2="466" y2="112" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="400" y1="110" x2="466" y2="172" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="360" y="214" text-anchor="middle" class="sub">re-running verifies and converges state instead of redoing work</text>
</svg>
