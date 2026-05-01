---
section: cloud-infra
status: archived
created: 2016-09-13
tagline: Auto-scaling Docker Swarm cluster for Azure — ARM template plus Makefile, manager and worker VMSS included.
---

## About
azure-docker-swarm-cluster provisions a Docker Swarm cluster on Azure using ARM templates, with 1–5 master VMs plus a worker VM Scale Set. Auto-scaling rules on the worker VMSS respond to CPU load, expanding and shrinking the cluster automatically. A Makefile wraps the Azure CLI for storage and compute deployment. ★47 with 11 forks — a reference template from the pre-Kubernetes container era that still gets cited.

## How it works
The ARM template creates master VMs in an availability set, a worker VM Scale Set, shared storage, and the required network resources. Cloud-init on the master nodes initialises the Swarm and runs a small helper service on `master0` that hands out join tokens to workers as they boot. A public load balancer fronts the worker nodes for application traffic, and autoscale settings resize the worker VMSS under load.

## Features
### 📈 Auto-scaling workers
Azure VMSS auto-scale rules expand the worker pool under load and shrink it when idle — no manual intervention.

### 🔑 Swarm helper bootstrap
`master0` runs a small helper service that provides join tokens and cleans up departing workers — simple cloud-init driven cluster membership.

### 🔄 Manager HA
Odd-numbered manager VMSS ensures Raft quorum survives a single node failure without manual recovery.

### ⚙️ Makefile orchestration
`make deploy` / `make destroy` wraps the Azure CLI — no portal clicks, full automation from first principles.

### 📦 Pre-Kubernetes reference
Documents the Docker Swarm era architecture; useful for comparing operational complexity against modern Kubernetes templates.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 326">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
    .box-teal { fill: #ccfbf1; stroke: #0d9488; stroke-width: 1.5; }
    .box-slate { fill: #f1f5f9; stroke: #64748b; stroke-width: 1.5; }
    .box-indigo { fill: #e0e7ff; stroke: #4f46e5; stroke-width: 1.5; }
    .box-rose { fill: #ffe4e6; stroke: #e11d48; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #cffafe; stroke: #0891b2; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .box-teal { fill: #0d2228; stroke: #1a8a7a; }
      .box-slate { fill: #1e293b; stroke: #475569; }
      .box-indigo { fill: #1e1b4b; stroke: #6366f1; }
      .box-rose { fill: #2a0a12; stroke: #f43f5e; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #082f3a; stroke: #06b6d4; }
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
  <rect width="1040" height="326" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-slate"/>
  <text x="120" y="56" text-anchor="middle" class="label">ARM template</text>
  <text x="120" y="74" text-anchor="middle" class="sub">cluster.json</text>

  <rect x="290" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="380" y="56" text-anchor="middle" class="label">Shared storage</text>
  <text x="380" y="74" text-anchor="middle" class="sub">Storage account + Azure Files</text>

  <rect x="290" y="118" width="180" height="60" rx="8" class="box-accent"/>
  <text x="380" y="144" text-anchor="middle" class="label">Masters</text>
  <text x="380" y="162" text-anchor="middle" class="sub">availability set + NIC/PIP/NSG</text>

  <rect x="290" y="206" width="180" height="60" rx="8" class="box-purple"/>
  <text x="380" y="232" text-anchor="middle" class="label">Workers</text>
  <text x="380" y="250" text-anchor="middle" class="sub">VM scale set + autoscale</text>

  <rect x="550" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="640" y="56" text-anchor="middle" class="label">Network edge</text>
  <text x="640" y="74" text-anchor="middle" class="sub">VNet + public LB + inbound NAT</text>

  <rect x="550" y="118" width="180" height="60" rx="8" class="box-slate"/>
  <text x="640" y="144" text-anchor="middle" class="label">Cloud-init helpers</text>
  <text x="640" y="162" text-anchor="middle" class="sub">swarm init / join / leave</text>

  <rect x="810" y="30" width="180" height="60" rx="8" class="box-slate"/>
  <text x="900" y="56" text-anchor="middle" class="label">Swarm cluster</text>
  <text x="900" y="74" text-anchor="middle" class="sub">masters + agents</text>

  <path d="M210,60 L290,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M210,60 L236,60 Q250,60 250,74 L250,134 Q250,148 264,148 L290,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M210,60 L236,60 Q250,60 250,74 L250,222 Q250,236 264,236 L290,236" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,148 L496,148 Q510,148 510,134 L510,74 Q510,60 524,60 L550,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,236 L496,236 Q510,236 510,222 L510,162 Q510,148 524,148 L550,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M730,60 L810,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M730,148 L756,148 Q770,148 770,134 L770,74 Q770,60 784,60 L810,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="520" y="318" text-anchor="middle" class="sub">actual ARM layout: storage, masters, worker VMSS, load balancer, autoscale, and cloud-init bootstrap scripts</text>
</svg>
