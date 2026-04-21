---
section: cloud
status: stable
created: 2022-11-27
tagline: One-command Stable Diffusion on Azure GPU spot instances.
---

## About
Makefile wrapping Azure Bicep. make deploy provisions an NC-series GPU spot VM and installs AUTOMATIC1111. make open opens an SSH tunnel. make destroy tears it down. Spot pricing keeps costs under $0.10/hour.

## How it works
make deploy runs a Bicep template that provisions a resource group, data disk, and GPU spot VM, then runs cloud-init to install CUDA and AUTOMATIC1111. Models live on an attached data disk that survives spot preemptions and teardowns. make destroy cleans up everything except the data disk configuration.

## Features
### ⚡ Three commands
make deploy, make open, make destroy. Under 10 minutes total.

### 💰 Spot pricing
NC6s_v3: typically under $0.10/hour.

### 💾 Persistent models
Data disk survives spot preemptions and redeployments.

## Posts
- [Very Stable Diffusion](https://taoofmac.com/space/blog/2022/09/03/1400) — 2022-09-03
- [A Diffuse Return](https://taoofmac.com/space/blog/2022/11/27/1800) — 2022-11-27

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 230">
  <style>
    @media (prefers-color-scheme: dark) {
      .box { fill: #1a1e2a; stroke: #2a3040; stroke-width: 1.5; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; stroke-width: 1.5; }
      .box-green { fill: #0d2220; stroke: #207060; stroke-width: 1.5; }
      .label { fill: #d0daf0; }
      .sub { fill: #7f95b5; }
    }
    @media (prefers-color-scheme: light) {
      .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
      .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#5070a0"/></marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#3b82f6"/></marker>
  </defs>

  <rect x="20" y="82" width="120" height="66" rx="10" class="box"/>
  <image href="/assets/azure-icons/templates.svg" x="32" y="100" width="22" height="22"/>
  <text x="82" y="110" text-anchor="middle" class="label">Bicep deploy</text>
  <text x="82" y="127" text-anchor="middle" class="sub">make deploy</text>

  <rect x="200" y="82" width="150" height="66" rx="10" class="box-accent"/>
  <image href="/assets/azure-icons/virtual-machine.svg" x="214" y="100" width="22" height="22"/>
  <text x="274" y="110" text-anchor="middle" class="label">GPU spot VM</text>
  <text x="274" y="127" text-anchor="middle" class="sub">NC-series + cloud-init</text>

  <rect x="410" y="28" width="150" height="66" rx="10" class="box-green"/>
  <image href="/assets/azure-icons/disks.svg" x="424" y="46" width="22" height="22"/>
  <text x="486" y="56" text-anchor="middle" class="label">Data disk</text>
  <text x="486" y="73" text-anchor="middle" class="sub">models survive teardown</text>

  <rect x="410" y="136" width="150" height="66" rx="10" class="box-green"/>
  <text x="485" y="164" text-anchor="middle" class="label">AUTOMATIC1111</text>
  <text x="485" y="181" text-anchor="middle" class="sub">Stable Diffusion UI</text>

  <rect x="620" y="82" width="120" height="66" rx="10" class="box"/>
  <text x="680" y="110" text-anchor="middle" class="label">SSH tunnel</text>
  <text x="680" y="127" text-anchor="middle" class="sub">make open → 7860</text>

  <line x1="140" y1="115" x2="196" y2="115" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="350" y1="115" x2="406" y2="61" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="350" y1="115" x2="406" y2="169" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="560" y1="169" x2="616" y2="115" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="380" y="222" text-anchor="middle" class="sub">cheap spot compute for inference, persistent disk for models, browser UI through a local tunnel</text>
</svg>
