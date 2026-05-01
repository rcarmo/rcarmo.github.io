---
section: cloud-infra
status: archived
created: 2019-05-09
tagline: Azure ARM template to deploy a lightweight Kubernetes cluster using k3s — one make target, running in minutes.
---

## About
azure-k3s-cluster provisions a full k3s Kubernetes cluster on Azure using a parameterised ARM template, orchestrated by a Makefile. One command spins up a resource group, VMs, networking, and a working k3s cluster with a server node and configurable number of agents. A reference for anyone who wants real Kubernetes on Azure without the AKS management overhead or price tag. ★57 with 15 forks.

## How it works
The Makefile wraps `az deployment group create` with the ARM template and a parameter file, then polls until all nodes are Ready. Cloud-init on each VM downloads and installs k3s, joins agent nodes to the server, and exports the kubeconfig. A teardown target deletes the entire resource group cleanly. The ARM template is parameterised for VM size, node count, OS disk, and k3s version.

## Features
### ☁️ One-command deploy
`make deploy` provisions VMs, networking, and a running k3s cluster — no manual Azure portal steps.

### 🎛️ Parameterised template
VM size, agent count, k3s version, and region are all parameters — customise via a JSON file or Makefile overrides.

### 🪶 k3s, not AKS
Full Kubernetes API at a fraction of AKS cost — k3s runs on the smallest Azure VMs and needs no managed control plane.

### 🔑 Kubeconfig export
The Makefile fetches the kubeconfig after deploy and patches the server address — `kubectl` works immediately.

### 🗑️ Clean teardown
`make destroy` deletes the resource group and everything in it — no orphaned resources.

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
  <text x="380" y="56" text-anchor="middle" class="label">Storage resource group</text>
  <text x="380" y="74" text-anchor="middle" class="sub">Storage account + Azure Files</text>

  <rect x="290" y="118" width="180" height="60" rx="8" class="box-slate"/>
  <text x="380" y="144" text-anchor="middle" class="label">Master VM(s)</text>
  <text x="380" y="162" text-anchor="middle" class="sub">availability set + NIC/PIP/NSG</text>

  <rect x="290" y="206" width="180" height="60" rx="8" class="box-slate"/>
  <text x="380" y="232" text-anchor="middle" class="label">Agent VMSS</text>
  <text x="380" y="250" text-anchor="middle" class="sub">autoscale settings</text>

  <rect x="550" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="640" y="56" text-anchor="middle" class="label">Managed identity</text>
  <text x="640" y="74" text-anchor="middle" class="sub">role assignment for scale ops</text>

  <rect x="550" y="118" width="180" height="60" rx="8" class="box-slate"/>
  <text x="640" y="144" text-anchor="middle" class="label">Cloud-init bootstrap</text>
  <text x="640" y="162" text-anchor="middle" class="sub">k3s install + join/leave helper</text>

  <rect x="810" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="900" y="56" text-anchor="middle" class="label">k3s cluster</text>
  <text x="900" y="74" text-anchor="middle" class="sub">server, agents, shared /srv</text>

  <path d="M210,60 L290,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M210,60 L236,60 Q250,60 250,74 L250,134 Q250,148 264,148 L290,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M210,60 L236,60 Q250,60 250,74 L250,222 Q250,236 264,236 L290,236" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,148 L496,148 Q510,148 510,134 L510,74 Q510,60 524,60 L550,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,236 L496,236 Q510,236 510,222 L510,162 Q510,148 524,148 L550,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M730,60 L810,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M730,148 L756,148 Q770,148 770,134 L770,74 Q770,60 784,60 L810,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="520" y="318" text-anchor="middle" class="sub">actual template structure: separate storage/compute concerns, master identity, agent VM scale set, and cloud-init managed cluster membership</text>
</svg>
