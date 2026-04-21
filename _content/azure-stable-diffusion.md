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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 250">
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

  <rect x="20" y="90" width="126" height="70" rx="10" class="box"/>
  <image href="/assets/azure-icons/templates.svg" x="34" y="110" width="22" height="22"/>
  <text x="90" y="118" text-anchor="middle" class="label">ARM template</text>
  <text x="90" y="135" text-anchor="middle" class="sub">compute.json</text>

  <rect x="196" y="24" width="170" height="72" rx="10" class="box-green"/>
  <image href="/assets/azure-icons/storage-accounts.svg" x="210" y="44" width="22" height="22"/>
  <text x="281" y="52" text-anchor="middle" class="label">Diagnostics storage</text>
  <text x="281" y="69" text-anchor="middle" class="sub">boot diagnostics account</text>

  <rect x="196" y="104" width="170" height="72" rx="10" class="box-accent"/>
  <image href="/assets/azure-icons/virtual-machine.svg" x="210" y="124" width="22" height="22"/>
  <text x="281" y="132" text-anchor="middle" class="label">Spot VM</text>
  <text x="281" y="149" text-anchor="middle" class="sub">Ubuntu + OS disk only</text>

  <rect x="196" y="184" width="170" height="72" rx="10" class="box"/>
  <text x="281" y="212" text-anchor="middle" class="label">Network resources</text>
  <text x="281" y="229" text-anchor="middle" class="sub">VNet + NIC + PIP + NSG</text>

  <rect x="430" y="64" width="170" height="72" rx="10" class="box-green"/>
  <text x="515" y="92" text-anchor="middle" class="label">cloud-init</text>
  <text x="515" y="109" text-anchor="middle" class="sub">CUDA + AUTOMATIC1111</text>

  <rect x="430" y="164" width="170" height="72" rx="10" class="box-accent"/>
  <text x="515" y="192" text-anchor="middle" class="label">Spot helper</text>
  <text x="515" y="209" text-anchor="middle" class="sub">scheduled/preemption events</text>

  <rect x="664" y="104" width="156" height="72" rx="10" class="box-green"/>
  <text x="742" y="132" text-anchor="middle" class="label">Web UI VM</text>
  <text x="742" y="149" text-anchor="middle" class="sub">SSH tunnel to port 7860</text>

  <line x1="146" y1="104" x2="192" y2="60" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="146" y1="125" x2="192" y2="140" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="146" y1="146" x2="192" y2="220" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="366" y1="140" x2="426" y2="100" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="366" y1="140" x2="426" y2="200" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="600" y1="100" x2="660" y2="126" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="600" y1="200" x2="660" y2="154" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="420" y="244" text-anchor="middle" class="sub">actual template resources: one spot VM, one network stack, one diagnostics account — no separate persistent data disk in compute.json</text>
</svg>
