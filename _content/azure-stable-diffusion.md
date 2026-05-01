---
section: cloud-deployment
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 280">
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

  <rect x="20" y="102" width="130" height="76" rx="10" class="box"/>
  <image href="/assets/azure-icons/templates.svg" x="74" y="113" width="22" height="22"/>
  <text x="85" y="153" text-anchor="middle" class="label">ARM template</text>
  <text x="85" y="169" text-anchor="middle" class="sub">compute.json</text>

  <rect x="200" y="20" width="180" height="68" rx="10" class="box-green"/>
  <image href="/assets/azure-icons/storage-accounts.svg" x="279" y="29" width="22" height="22"/>
  <text x="290" y="66" text-anchor="middle" class="label">Diagnostics storage</text>
  <text x="290" y="81" text-anchor="middle" class="sub">boot diagnostics account</text>

  <rect x="200" y="106" width="180" height="68" rx="10" class="box-accent"/>
  <image href="/assets/azure-icons/virtual-machine.svg" x="279" y="115" width="22" height="22"/>
  <text x="290" y="152" text-anchor="middle" class="label">GPU spot VM</text>
  <text x="290" y="167" text-anchor="middle" class="sub">Ubuntu + OS disk only</text>

  <rect x="200" y="192" width="180" height="68" rx="10" class="box"/>
  <text x="290" y="228" text-anchor="middle" class="label">Network resources</text>
  <text x="290" y="243" text-anchor="middle" class="sub">VNet + NIC + PIP + NSG</text>

  <rect x="450" y="52" width="180" height="68" rx="10" class="box-green"/>
  <text x="540" y="88" text-anchor="middle" class="label">cloud-init</text>
  <text x="540" y="103" text-anchor="middle" class="sub">CUDA + AUTOMATIC1111</text>

  <rect x="450" y="160" width="180" height="68" rx="10" class="box-accent"/>
  <text x="540" y="196" text-anchor="middle" class="label">Spot helper</text>
  <text x="540" y="211" text-anchor="middle" class="sub">preemption + maintenance</text>

  <rect x="700" y="102" width="140" height="76" rx="10" class="box-green"/>
  <text x="770" y="136" text-anchor="middle" class="label">Web UI</text>
  <text x="770" y="152" text-anchor="middle" class="sub">SSH tunnel → 7860</text>

  <line x1="150" y1="121" x2="196" y2="54" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="150" y1="140" x2="196" y2="140" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="150" y1="159" x2="196" y2="226" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="380" y1="140" x2="446" y2="86" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="380" y1="140" x2="446" y2="194" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="630" y1="86" x2="696" y2="126" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="630" y1="194" x2="696" y2="154" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="430" y="272" text-anchor="middle" class="sub">actual compute.json layout: diagnostics account, one spot VM, one network stack, and VM bootstrap scripts feeding the web UI</text>
</svg>
