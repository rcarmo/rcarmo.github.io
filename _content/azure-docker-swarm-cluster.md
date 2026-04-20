---
section: cloud
status: archived
tagline: Auto-scaling Docker Swarm cluster for Azure — ARM template plus Makefile, manager and worker VMSS included.
---

## About
azure-docker-swarm-cluster provisions a production-grade Docker Swarm cluster on Azure using ARM templates, with separate VM Scale Sets for manager and worker nodes. Auto-scaling rules on the worker VMSS respond to CPU load, expanding and shrinking the cluster automatically. A Makefile wraps the Azure CLI for one-command deploy and teardown. ★47 with 11 forks — a reference template from the pre-Kubernetes container era that still gets cited.

## How it works
The ARM template creates a manager VMSS (fixed size, odd number for Raft quorum) and a worker VMSS (auto-scaling). Cloud-init on managers initialises the Swarm and stores the join token in an Azure Key Vault secret; workers fetch the token on boot and join automatically. An internal load balancer distributes Swarm management traffic; a public load balancer fronts the worker nodes for application traffic.

## Features
### 📈 Auto-scaling workers
Azure VMSS auto-scale rules expand the worker pool under load and shrink it when idle — no manual intervention.

### 🗝️ Secure join token
The Swarm join token is stored in Azure Key Vault and retrieved by worker VMs via managed identity — never in userdata or scripts.

### 🔄 Manager HA
Odd-numbered manager VMSS ensures Raft quorum survives a single node failure without manual recovery.

### ⚙️ Makefile orchestration
`make deploy` / `make destroy` wraps the Azure CLI — no portal clicks, full automation from first principles.

### 📦 Pre-Kubernetes reference
Documents the Docker Swarm era architecture; useful for comparing operational complexity against modern Kubernetes templates.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 220" width="640" height="220">
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
  <rect x="20" y="80" width="110" height="60" rx="8" class="box-warm"/>
  <text x="75" y="113" text-anchor="middle" class="label">Makefile</text>
  <text x="75" y="128" text-anchor="middle" class="sub">az deployment</text>
  <rect x="190" y="20" width="130" height="60" rx="8" class="box-accent"/>
  <text x="255" y="53" text-anchor="middle" class="label">Manager VMSS</text>
  <text x="255" y="68" text-anchor="middle" class="sub">Raft quorum ×3</text>
  <rect x="190" y="130" width="130" height="60" rx="8" class="box"/>
  <text x="255" y="163" text-anchor="middle" class="label">Worker VMSS</text>
  <text x="255" y="178" text-anchor="middle" class="sub">auto-scale</text>
  <rect x="400" y="20" width="120" height="60" rx="8" class="box-b"/>
  <text x="460" y="53" text-anchor="middle" class="label">Key Vault</text>
  <text x="460" y="68" text-anchor="middle" class="sub">join token</text>
  <rect x="400" y="130" width="120" height="60" rx="8" class="box"/>
  <text x="460" y="163" text-anchor="middle" class="label">Swarm API</text>
  <text x="460" y="178" text-anchor="middle" class="sub">port 2377</text>
  <line x1="130" y1="100" x2="190" y2="80" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="130" y1="125" x2="190" y2="160" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="320" y1="50" x2="400" y2="50" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="320" y1="160" x2="400" y2="160" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="255" y1="80" x2="255" y2="130" class="arrow" stroke-width="1.5"/>
</svg>
