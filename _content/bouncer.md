---
section: infrastructure
status: stable
created: 2026-03-01
logo: assets/logos-opt/bouncer.png
tagline: Passkey-only reverse proxy with built-in CA, iOS onboarding, and Cloudflare Tunnel support.
---

## About
A Go reverse proxy that gates any backend HTTP service behind WebAuthn passkeys — no passwords, no TOTP codes. Ships a built-in CA for zero-config local TLS, generates `.mobileconfig` profiles for iOS/macOS trust installation, and supports Cloudflare Tunnel mode to skip local TLS entirely. A 6-digit one-time enrollment token, optional Pushover alerts with geolocation, and multi-site host routing complete the picture.

## How it works
On startup, Bouncer generates a root CA and server certificate automatically, then listens for HTTPS connections. Unauthenticated requests are redirected to an onboarding flow where a user registers a passkey using a one-time token. Once enrolled, sessions last 7 days (persisted across restarts). Authenticated requests are forwarded transparently to the backend. In Cloudflare Tunnel mode, Cloudflare provides HTTPS and Bouncer skips all local TLS.

## Features
### 🔑 Passkey-only auth
WebAuthn — no passwords, no TOTP. Same-origin enforced.

### 🔐 Built-in CA
Root CA + server cert generated on first run. No mkcert, no Let's Encrypt.

### 📲 iOS / macOS onboarding
Serves `.mobileconfig` trust profiles; passkey enrolment from Safari.

### ☁️ Cloudflare Tunnel mode
Skip local TLS entirely — Cloudflare provides HTTPS.

### 🔢 One-time enrolment token
6-digit token on demand, logged + optional Pushover alert with IP / geo.

### 🌐 Multi-site host routing
Multiple backends in a single instance, per-site passkey stores.

### 📦 Single binary
Static Go binary; Docker-ready.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 170">
  <style>
    @media (prefers-color-scheme: dark) {
      .box { fill:#1a1e2a; stroke:#2a3040; stroke-width:1.5; }
      .hi  { fill:#0d1e38; stroke:#2b5cb0; stroke-width:1.5; }
      .hi2 { fill:#0d2220; stroke:#207060; stroke-width:1.5; }
      .label{ fill:#d0daf0; } .sub{ fill:#5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .box { fill:#fff; stroke:#c8d0e0; stroke-width:1.5; }
      .hi  { fill:#dbeafe; stroke:#3b82f6; stroke-width:1.5; }
      .hi2 { fill:#d1fae5; stroke:#059669; stroke-width:1.5; }
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

  <!-- Browser / device -->
  <rect x="8"   y="30" width="110" height="110" rx="8" class="box"/>
  <text x="63"  y="62" text-anchor="middle" class="label">Browser</text>
  <text x="63"  y="79" text-anchor="middle" class="sub">Passkey auth</text>
  <text x="63"  y="95" text-anchor="middle" class="sub">iOS .mobileconfig</text>
  <text x="63"  y="111" text-anchor="middle" class="sub">enrolment token</text>

  <line x1="118" y1="85" x2="154" y2="85" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- Bouncer -->
  <rect x="156" y="10" width="200" height="150" rx="8" class="hi"/>
  <text x="256" y="40" text-anchor="middle" class="label">Bouncer</text>
  <text x="256" y="58" text-anchor="middle" class="sub">WebAuthn · sessions</text>
  <text x="256" y="74" text-anchor="middle" class="sub">Built-in CA + TLS</text>
  <text x="256" y="90" text-anchor="middle" class="sub">Onboarding flow</text>
  <text x="256" y="106" text-anchor="middle" class="sub">Multi-site routing</text>
  <text x="256" y="122" text-anchor="middle" class="sub">Pushover alerts + geo</text>
  <text x="256" y="138" text-anchor="middle" class="sub">Cloudflare Tunnel mode</text>

  <line x1="356" y1="85" x2="392" y2="85" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- Backend -->
  <rect x="394" y="50" width="120" height="70" rx="8" class="hi2"/>
  <text x="454" y="80" text-anchor="middle" class="label">Backend</text>
  <text x="454" y="97" text-anchor="middle" class="sub">any HTTP service</text>

  <!-- Sessions store -->
  <rect x="534" y="30" width="158" height="110" rx="8" class="box"/>
  <text x="613" y="60" text-anchor="middle" class="label">Local State</text>
  <text x="613" y="77" text-anchor="middle" class="sub">bouncer.json</text>
  <text x="613" y="93" text-anchor="middle" class="sub">users + config</text>
  <text x="613" y="109" text-anchor="middle" class="sub">sessions file</text>
  <text x="613" y="125" text-anchor="middle" class="sub">CA key + cert</text>

  <line x1="514" y1="85" x2="530" y2="85" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
</svg>
