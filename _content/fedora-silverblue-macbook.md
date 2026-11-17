---
id: fedora-silverblue-macbook
repo: rcarmo/fedora-silverblue-macbook
section: apple
status: experimental
created: 2026-11-02
tagline: Fedora Silverblue drivers and configuration for the 2016 MacBookPro13,2 with Apple T1.
---

## About
This repository brings Fedora Silverblue to the 13-inch, four-port 2016 MacBook Pro with an Apple T1. It collects driver packages, configuration and a rebuild kit for the Touch Bar, audio, Wi-Fi and suspend/resume behaviour.

The setup is experimental and tested on one MacBookPro13,2. The reference setup uses Silverblue 44 with kernel 7.2.13; the audio driver is restricted to the 7.2 series. Other MacBook models need their own validation.

## How it works
Local Touch Bar and CS8409 audio drivers are packaged as RPMs, alongside the board-specific Wi-Fi NVRAM and system configuration. The installation guide requires a kernel check and recovery media before applying the setup.

Suspend hooks handle the device teardown and restoration needed for S3 sleep. Separate, opt-in diagnostics investigate awake power use; the installer does not enable the experimental ASPM changes.

## Features
### Touch Bar and audio
Touch Bar controls, speakers and microphone work on the reference setup. The microphone is quiet; the headphone jack is untested.

### Wireless networking
Board-specific configuration enables 2.4 and 5 GHz Wi-Fi. WPA3-Personal is unsupported; Bluetooth pairing is untested.

### S3 suspend
A documented suspend/resume setup restores devices after sleep. Occasional early wake is still possible.

### Display controls
Includes an optional GNOME brightness slider and CLI for a tested LG UltraFine display. General dock and external-display compatibility is not established.

### Rebuild kit
Driver sources, RPM packaging, installation checks and recovery guidance keep the working configuration reproducible.

### Hardware limits
Touch ID is unsupported. Some USB-C functions are only partly tested, and intermittent trackpad phantom clicks are unresolved.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 114">
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
    .sub { fill: #243b53; }
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
      .sub { fill: #90a8c0; }
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
  <rect width="960" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Rebuild kit</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Drivers + configuration</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="360" y="56" text-anchor="middle" class="label">Install checks</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Kernel + recovery</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">Silverblue host</text>
  <text x="600" y="74" text-anchor="middle" class="sub">MacBookPro13,2 / T1</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Device setup</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Touch Bar, audio, S3</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="480" y="110" text-anchor="middle" class="sub">Hardware enablement for MacBookPro13,2 on Silverblue</text>
</svg>
## Posts
- [Reviving a Touch Bar MacBook with Fedora Silverblue](https://taoofmac.com/space/blog/2026/11/03/2037) — 2026-11-03
