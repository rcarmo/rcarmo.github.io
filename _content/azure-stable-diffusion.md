---
section: ai-ml
status: stable
tagline: One-command Stable Diffusion on Azure GPU spot instances.
logo: assets/logos-opt/azure-stable-diffusion.png
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" width="640" height="200">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #111520; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-b { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
      .bg-fill { fill: #111520; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: #f0f4fa; }
      .box { fill: #ffffff; stroke: #c8d0e0; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-b { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
      .bg-fill { fill: #f0f4fa; }
    }
    text { font-family: -apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
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
  <rect x="390" y="30" width="120" height="60" rx="8" class="box-b"/>
  <text x="450" y="63" text-anchor="middle" class="label">Stable Diff</text>
  <text x="450" y="78" text-anchor="middle" class="sub">AUTOMATIC1111</text>
  <rect x="390" y="110" width="120" height="60" rx="8" class="box"/>
  <text x="450" y="143" text-anchor="middle" class="label">Gradio UI</text>
  <text x="450" y="158" text-anchor="middle" class="sub">port 7860</text>
  <line x1="130" y1="100" x2="190" y2="100" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="320" y1="80" x2="390" y2="60" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="320" y1="115" x2="390" y2="140" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
