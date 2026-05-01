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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 290">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #707070; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #74a7ff; stroke: #012f7b; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #adadad; stroke: #000000; stroke-width: 1.5; }
    .box-teal { fill: #ebebeb; stroke: #474747; stroke-width: 1.5; }
    .box-slate { fill: #a7c6ff; stroke: #0042a9; stroke-width: 1.5; }
    .box-indigo { fill: #dfeed4; stroke: #4e7a27; stroke-width: 1.5; }
    .box-rose { fill: #dfeed4; stroke: #76bb40; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #d9c9fe; stroke: #5e30eb; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #505050; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0a1a3a; stroke: #4a80d0; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #222222; stroke: #666666; }
      .box-teal { fill: #1e1e1e; stroke: #666666; }
      .box-slate { fill: #0d1a38; stroke: #4a7ad0; }
      .box-indigo { fill: #1a2810; stroke: #5a8a30; }
      .box-rose { fill: #1a2810; stroke: #5aaa30; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #1a1030; stroke: #7040d0; }
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
  <rect width="960" height="290" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-slate"/>
  <text x="120" y="56" text-anchor="middle" class="label">ARM template</text>
  <text x="120" y="74" text-anchor="middle" class="sub">cluster.json</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="360" y="56" text-anchor="middle" class="label">Storage resource group</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Storage account + Azure Files</text>

  <rect x="270" y="118" width="180" height="60" rx="8" class="box-slate"/>
  <text x="360" y="144" text-anchor="middle" class="label">Master VM(s)</text>
  <text x="360" y="162" text-anchor="middle" class="sub">availability set + NIC/PIP/NSG</text>

  <rect x="270" y="206" width="180" height="60" rx="8" class="box-slate"/>
  <text x="360" y="232" text-anchor="middle" class="label">Agent VMSS</text>
  <text x="360" y="250" text-anchor="middle" class="sub">autoscale settings</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">Managed identity</text>
  <text x="600" y="74" text-anchor="middle" class="sub">role assignment for scale ops</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-slate"/>
  <text x="600" y="144" text-anchor="middle" class="label">Cloud-init bootstrap</text>
  <text x="600" y="162" text-anchor="middle" class="sub">k3s install + join/leave helper</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="840" y="56" text-anchor="middle" class="label">k3s cluster</text>
  <text x="840" y="74" text-anchor="middle" class="sub">server, agents, shared /srv</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M210,60 L226,60 Q240,60 240,74 L240,134 Q240,148 254,148 L270,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M210,60 L226,60 Q240,60 240,74 L240,222 Q240,236 254,236 L270,236" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,148 L466,148 Q480,148 480,134 L480,74 Q480,60 494,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,236 L466,236 Q480,236 480,222 L480,162 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,148 L706,148 Q720,148 720,134 L720,74 Q720,60 734,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="480" y="286" text-anchor="middle" class="sub">actual template structure: separate storage/compute concerns, master identity, agent VM scale set, and cloud-init managed cluster membership</text>
</svg>
