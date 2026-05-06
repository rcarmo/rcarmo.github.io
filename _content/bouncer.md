---
section: cloud-infra
status: experimental
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 114">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #707070; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #74a7ff; stroke: #012f7b; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #adadad; stroke: #000000; stroke-width: 1.5; }
    .box-teal { fill: #ebebeb; stroke: #474747; stroke-width: 1.5; }
    .box-slate { fill: #a7c6ff; stroke: #0042a9; stroke-width: 1.5; }
    .box-indigo { fill: #dfeed4; stroke: #4e7a27; stroke-width: 1.5; }
    .box-rose { fill: #dfeed4; stroke: #76bb40; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #d9c9fe; stroke: #5e30eb; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #505050; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0a1a3a; stroke: #4a80d0; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #222222; stroke: #666666; }
      .box-teal { fill: #1e1e1e; stroke: #666666; }
      .box-slate { fill: #0d1a38; stroke: #4a7ad0; }
      .box-indigo { fill: #1a2810; stroke: #5a8a30; }
      .box-rose { fill: #1a2810; stroke: #5aaa30; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #1a1030; stroke: #7040d0; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
    }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6" stroke="none"/>
    </marker>
  </defs>
  <rect width="480" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="120" y="56" text-anchor="middle" class="label">Browser</text>
  <text x="120" y="74" text-anchor="middle" class="sub">enrolment token</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="360" y="56" text-anchor="middle" class="label">Local State</text>
  <text x="360" y="74" text-anchor="middle" class="sub">CA key + cert</text>



  <text x="240" y="110" text-anchor="middle" class="sub">any HTTP service</text>
</svg>
