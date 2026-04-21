---
section: macos
status: stable
created: 2025-08-09
tagline: Switch Steam accounts on a shared PC via HomeKit.
---

## About
HAP-python service exposing each Steam account as a HomeKit Switch. Uses Steam's local --login flag — no Steam API, no Valve servers.

## How it works
HAP-python advertises a HomeKit bridge on the local network. When you flip a switch, on_set_value runs subprocess with Steam's --login flag. Steam's local CLI handles the account switch without any Web API calls. The service reads the current active account from the Steam registry file on startup.

## Features
### 🏠 HomeKit native
Siri, Shortcuts, automations all work.

### 🎮 No Steam API
Local --login flag only. No Valve network calls.

### 🐧 macOS and Linux
Runs as systemd service.

## Posts
- [Notes for December 9-24](https://taoofmac.com/space/notes/2025/12/24/1400) — 2025-12-24

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 206">
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
  <rect width="660" height="206" class="bg" rx="8"/>

  <rect x="20" y="65" width="160" height="60" rx="8" class="box"/>
  <text x="100" y="91" text-anchor="middle" class="label">HomeKit</text>
  <text x="100" y="109" text-anchor="middle" class="sub">virtual switch</text>

  <rect x="250" y="24" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="50" text-anchor="middle" class="label">HAP server</text>
  <text x="330" y="68" text-anchor="middle" class="sub">Python HAP-python</text>

  <rect x="250" y="106" width="160" height="60" rx="8" class="box-warm"/>
  <text x="330" y="132" text-anchor="middle" class="label">Steam config</text>
  <text x="330" y="150" text-anchor="middle" class="sub">loginusers.vdf</text>

  <rect x="480" y="65" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="91" text-anchor="middle" class="label">Active user</text>
  <text x="560" y="109" text-anchor="middle" class="sub">registry write</text>

</svg>
