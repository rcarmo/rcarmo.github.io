---
section: cloud-deployment
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 280">
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

  <rect x="20" y="104" width="126" height="70" rx="10" class="box"/>
  <image href="/assets/azure-icons/templates.svg" x="72" y="114" width="22" height="22"/>
  <text x="83" y="151" text-anchor="middle" class="label">ARM template</text>
  <text x="83" y="166" text-anchor="middle" class="sub">cluster.json</text>

  <rect x="196" y="24" width="168" height="72" rx="10" class="box-green"/>
  <image href="/assets/azure-icons/storage-accounts.svg" x="269" y="34" width="22" height="22"/>
  <text x="280" y="71" text-anchor="middle" class="label">Shared storage</text>
  <text x="280" y="86" text-anchor="middle" class="sub">Storage account + Azure Files</text>

  <rect x="196" y="104" width="168" height="72" rx="10" class="box-accent"/>
  <image href="/assets/azure-icons/virtual-machine.svg" x="269" y="114" width="22" height="22"/>
  <text x="280" y="151" text-anchor="middle" class="label">Masters</text>
  <text x="280" y="166" text-anchor="middle" class="sub">availability set + NIC/PIP/NSG</text>

  <rect x="196" y="184" width="168" height="72" rx="10" class="box"/>
  <image href="/assets/azure-icons/vm-scale-sets.svg" x="269" y="194" width="22" height="22"/>
  <text x="280" y="231" text-anchor="middle" class="label">Workers</text>
  <text x="280" y="246" text-anchor="middle" class="sub">VM scale set + autoscale</text>

  <rect x="430" y="64" width="168" height="72" rx="10" class="box-green"/>
  <image href="/assets/azure-icons/load-balancers.svg" x="503" y="74" width="22" height="22"/>
  <text x="514" y="111" text-anchor="middle" class="label">Network edge</text>
  <text x="514" y="126" text-anchor="middle" class="sub">VNet + public LB + inbound NAT</text>

  <rect x="430" y="164" width="168" height="72" rx="10" class="box-accent"/>
  <image href="/assets/azure-icons/virtual-machine.svg" x="503" y="174" width="22" height="22"/>
  <text x="514" y="211" text-anchor="middle" class="label">Cloud-init helpers</text>
  <text x="514" y="226" text-anchor="middle" class="sub">swarm init / join / leave</text>

  <rect x="664" y="104" width="136" height="72" rx="10" class="box-green"/>
  <text x="732" y="132" text-anchor="middle" class="label">Swarm cluster</text>
  <text x="732" y="149" text-anchor="middle" class="sub">masters + agents</text>

  <line x1="146" y1="116" x2="192" y2="60" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="146" y1="139" x2="192" y2="139" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="146" y1="162" x2="192" y2="220" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="364" y1="140" x2="426" y2="100" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="364" y1="220" x2="426" y2="200" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="598" y1="100" x2="660" y2="126" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="598" y1="200" x2="660" y2="154" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="410" y="272" text-anchor="middle" class="sub">actual ARM layout: storage, masters, worker VMSS, load balancer, autoscale, and cloud-init bootstrap scripts</text>
</svg>
