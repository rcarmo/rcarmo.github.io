---
section: cloud
status: stable
created: 2022-11-27
tagline: One-command Stable Diffusion on Azure GPU spot instances.
---

## About
Makefile wrapping an Azure ARM template. `make deploy` provisions an NC-series GPU spot VM and installs AUTOMATIC1111. `make open` opens an SSH tunnel. `make destroy` tears it down. Spot pricing keeps costs under $0.10/hour.

## How it works
`make deploy` runs an ARM template that provisions a diagnostics storage account, network resources, and a GPU spot VM, then uses cloud-init to install CUDA and AUTOMATIC1111. A helper service watches Azure spot-instance events so the machine can react cleanly to preemption or scheduled maintenance. `make destroy` removes the deployed resources.

## Features
### ⚡ Three commands
make deploy, make open, make destroy. Under 10 minutes total.

### 💰 Spot pricing
NC6s_v3: typically under $0.10/hour.

### 🧰 Cloud-init setup
CUDA, the web UI, and helper scripts are installed automatically on first boot.

## Posts
- [Very Stable Diffusion](https://taoofmac.com/space/blog/2022/09/03/1400) — 2022-09-03
- [A Diffuse Return](https://taoofmac.com/space/blog/2022/11/27/1800) — 2022-11-27

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 250">
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

  <rect x="20" y="90" width="120" height="74" rx="10" class="box"/>
  <image href="/assets/azure-icons/templates.svg" x="69" y="101" width="22" height="22"/>
  <text x="80" y="140" text-anchor="middle" class="label">ARM template</text>
  <text x="80" y="156" text-anchor="middle" class="sub">compute.json</text>

  <rect x="190" y="26" width="170" height="74" rx="10" class="box-green"/>
  <image href="/assets/azure-icons/storage-accounts.svg" x="264" y="37" width="22" height="22"/>
  <text x="275" y="76" text-anchor="middle" class="label">Diagnostics storage</text>
  <text x="275" y="92" text-anchor="middle" class="sub">boot diagnostics account</text>

  <rect x="190" y="90" width="170" height="74" rx="10" class="box-accent"/>
  <image href="/assets/azure-icons/virtual-machine.svg" x="264" y="101" width="22" height="22"/>
  <text x="275" y="140" text-anchor="middle" class="label">GPU spot VM</text>
  <text x="275" y="156" text-anchor="middle" class="sub">Ubuntu + OS disk only</text>

  <rect x="190" y="154" width="170" height="74" rx="10" class="box"/>
  <text x="275" y="187" text-anchor="middle" class="label">Network resources</text>
  <text x="275" y="203" text-anchor="middle" class="sub">VNet + NIC + PIP + NSG</text>

  <rect x="430" y="58" width="170" height="74" rx="10" class="box-green"/>
  <text x="515" y="91" text-anchor="middle" class="label">cloud-init</text>
  <text x="515" y="107" text-anchor="middle" class="sub">CUDA + AUTOMATIC1111</text>

  <rect x="430" y="122" width="170" height="74" rx="10" class="box-accent"/>
  <text x="515" y="155" text-anchor="middle" class="label">Spot helper</text>
  <text x="515" y="171" text-anchor="middle" class="sub">preemption + maintenance</text>

  <rect x="660" y="90" width="140" height="74" rx="10" class="box-green"/>
  <text x="730" y="123" text-anchor="middle" class="label">Web UI</text>
  <text x="730" y="139" text-anchor="middle" class="sub">SSH tunnel → 7860</text>

  <line x1="140" y1="108" x2="186" y2="63" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="140" y1="127" x2="186" y2="127" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="140" y1="146" x2="186" y2="191" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="360" y1="127" x2="426" y2="95" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="360" y1="127" x2="426" y2="159" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="600" y1="95" x2="656" y2="117" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="600" y1="159" x2="656" y2="137" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="410" y="244" text-anchor="middle" class="sub">actual compute.json layout: diagnostics account, one spot VM, one network stack, and bootstrap scripts inside the VM</text>
</svg>
