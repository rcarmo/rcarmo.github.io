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
  <rect x="20" y="60" width="110" height="80" rx="8" class="box-warm"/>
  <text x="75" y="98" text-anchor="middle" class="label">Makefile</text>
  <text x="75" y="115" text-anchor="middle" class="label">target</text>
  <text x="75" y="130" text-anchor="middle" class="sub">make deploy</text>
  <rect x="190" y="60" width="130" height="80" rx="8" class="box-accent"/>
  <text x="255" y="98" text-anchor="middle" class="label">Azure Spot</text>
  <text x="255" y="115" text-anchor="middle" class="label">GPU VM</text>
  <text x="255" y="130" text-anchor="middle" class="sub">NV-series</text>
  <rect x="390" y="30" width="120" height="60" rx="8" class="box-green"/>
  <text x="450" y="63" text-anchor="middle" class="label">Stable Diff</text>
  <text x="450" y="78" text-anchor="middle" class="sub">AUTOMATIC1111</text>
  <rect x="390" y="110" width="120" height="60" rx="8" class="box"/>
  <text x="450" y="143" text-anchor="middle" class="label">Gradio UI</text>
  <text x="450" y="158" text-anchor="middle" class="sub">port 7860</text>
  <line x1="130" y1="100" x2="190" y2="100" stroke-width="1.5" marker-end="url(#ahs)" stroke="#3b82f6"/>
  <line x1="320" y1="80" x2="390" y2="60" stroke-width="1.5" marker-end="url(#ah)" stroke="#5070a0"/>
  <line x1="320" y1="115" x2="390" y2="140" stroke-width="1.5" marker-end="url(#ah)" stroke="#5070a0"/>
</svg>
