---
section: cloud
status: archived
created: 2016-09-13
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 250">
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
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6"/>
    </marker>
  </defs>

  <rect x="20" y="92" width="120" height="66" rx="10" class="box"/>
  <image href="/assets/azure-icons/templates.svg" x="32" y="108" width="22" height="22"/>
  <text x="82" y="117" text-anchor="middle" class="label">ARM template</text>
  <text x="82" y="134" text-anchor="middle" class="sub">make deploy</text>

  <rect x="200" y="28" width="150" height="72" rx="10" class="box-accent"/>
  <image href="/assets/azure-icons/vm-scale-sets.svg" x="214" y="46" width="22" height="22"/>
  <text x="286" y="55" text-anchor="middle" class="label">Manager VMSS</text>
  <text x="286" y="72" text-anchor="middle" class="sub">odd-sized Raft quorum</text>

  <rect x="200" y="148" width="150" height="72" rx="10" class="box"/>
  <image href="/assets/azure-icons/vm-scale-sets.svg" x="214" y="166" width="22" height="22"/>
  <text x="286" y="175" text-anchor="middle" class="label">Worker VMSS</text>
  <text x="286" y="192" text-anchor="middle" class="sub">auto-scale rules</text>

  <rect x="410" y="28" width="150" height="72" rx="10" class="box-green"/>
  <image href="/assets/azure-icons/key-vaults.svg" x="424" y="46" width="22" height="22"/>
  <text x="497" y="55" text-anchor="middle" class="label">Key Vault</text>
  <text x="497" y="72" text-anchor="middle" class="sub">stores join token</text>

  <rect x="410" y="148" width="150" height="72" rx="10" class="box"/>
  <image href="/assets/azure-icons/load-balancers.svg" x="424" y="166" width="22" height="22"/>
  <text x="497" y="175" text-anchor="middle" class="label">Load balancers</text>
  <text x="497" y="192" text-anchor="middle" class="sub">internal + public</text>

  <rect x="620" y="92" width="120" height="66" rx="10" class="box-green"/>
  <text x="680" y="117" text-anchor="middle" class="label">Docker Swarm</text>
  <text x="680" y="134" text-anchor="middle" class="sub">apps + API 2377</text>

  <line x1="140" y1="112" x2="196" y2="64" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="140" y1="138" x2="196" y2="184" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="350" y1="64" x2="406" y2="64" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="350" y1="184" x2="406" y2="184" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="560" y1="64" x2="616" y2="112" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="560" y1="184" x2="616" y2="138" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="380" y="238" text-anchor="middle" class="sub">workers fetch the join token at boot and scale independently of the manager quorum</text>
</svg>
