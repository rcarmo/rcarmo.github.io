---
section: cloud-deployment
status: active
created: 2026-04-27
logo: assets/logos-opt/go-dance.png
tagline: Local-first private CA for homelabs — ACME, single binary, step-ca embedded.
---

## About
`dance` is a dead-simple private certificate authority for LAN and homelab use. A single Go binary wraps an embedded `step-ca` backend and exposes a browser-friendly landing page, a password-protected admin UI, and a fully functional ACME endpoint — so Caddy and other ACME clients enroll without any extra plumbing.

## How it works
`step-ca` runs in-process, writing to SQLite. `dance` fronts it with session-authenticated admin routes, a certificate inventory view, passive revocation, and EAB token management. Root certificate onboarding pages handle macOS, iOS, and other platforms. Everything is a single binary launched with environment variables — no daemon config files, no systemd units, no service mesh.

## Features
### 🔐 Embedded private CA
`step-ca` runs in-process; no separate daemon needed.

### 📜 ACME endpoint
Compatible with Caddy, certbot, and any RFC 8555 client.

### 🖥 Admin UI
Certificate inventory, revocation, EAB token creation — all in-browser.

### 📲 Trust onboarding
Root cert download pages for macOS, iOS, and generic platforms.

### 🗄 SQLite state
Audit log and admin state in a single local file.

### 📦 Single binary
`go build ./cmd/dance` — one file, no runtime deps.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 160">
  <style>
    @media (prefers-color-scheme: dark) {
      .box { fill:#1a1e2a; stroke:#2a3040; stroke-width:1.5; }
      .hi  { fill:#0d2220; stroke:#207060; stroke-width:1.5; }
      .label{ fill:#d0daf0; } .sub{ fill:#5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .box { fill:#fff; stroke:#c8d0e0; stroke-width:1.5; }
      .hi  { fill:#d1fae5; stroke:#059669; stroke-width:1.5; }
      .label{ fill:#1a2a40; } .sub{ fill:#5070a0; }
    }
    text { font-family:-apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label{ font-size:13px; font-weight:600; }
    .sub  { font-size:11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
  </defs>

  <!-- Client -->
  <rect x="8"   y="40" width="110" height="80" rx="8" class="box"/>
  <text x="63"  y="74" text-anchor="middle" class="label">ACME Client</text>
  <text x="63"  y="91" text-anchor="middle" class="sub">Caddy / certbot</text>
  <text x="63"  y="107" text-anchor="middle" class="sub">/ browser</text>

  <line x1="118" y1="80" x2="154" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- dance binary -->
  <rect x="156" y="20" width="180" height="120" rx="8" class="hi"/>
  <text x="246" y="50" text-anchor="middle" class="label">dance (single binary)</text>
  <text x="246" y="68" text-anchor="middle" class="sub">Admin UI · ACME routes</text>
  <text x="246" y="84" text-anchor="middle" class="sub">Trust onboarding pages</text>
  <text x="246" y="100" text-anchor="middle" class="sub">Session auth · EAB tokens</text>
  <text x="246" y="116" text-anchor="middle" class="sub">Certificate inventory</text>

  <line x1="336" y1="80" x2="372" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- step-ca -->
  <rect x="374" y="40" width="120" height="80" rx="8" class="box"/>
  <text x="434" y="74" text-anchor="middle" class="label">step-ca</text>
  <text x="434" y="91" text-anchor="middle" class="sub">embedded CA</text>
  <text x="434" y="107" text-anchor="middle" class="sub">in-process</text>

  <line x1="494" y1="80" x2="530" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- SQLite -->
  <rect x="532" y="40" width="120" height="80" rx="8" class="box"/>
  <text x="592" y="74" text-anchor="middle" class="label">SQLite</text>
  <text x="592" y="91" text-anchor="middle" class="sub">certs · audit</text>
  <text x="592" y="107" text-anchor="middle" class="sub">admin state</text>
</svg>
