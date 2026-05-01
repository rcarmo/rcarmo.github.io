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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 290">
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

  <rect x="20" y="110" width="126" height="70" rx="10" class="box"/>
  <image href="/assets/azure-icons/templates.svg" x="72" y="120" width="22" height="22"/>
  <text x="83" y="157" text-anchor="middle" class="label">ARM template</text>
  <text x="83" y="172" text-anchor="middle" class="sub">cluster.json</text>

  <rect x="196" y="28" width="176" height="72" rx="10" class="box-green"/>
  <image href="/assets/azure-icons/storage-accounts.svg" x="273" y="38" width="22" height="22"/>
  <text x="284" y="75" text-anchor="middle" class="label">Storage resource group</text>
  <text x="284" y="90" text-anchor="middle" class="sub">Storage account + Azure Files</text>

  <rect x="196" y="110" width="176" height="72" rx="10" class="box-accent"/>
  <image href="/assets/azure-icons/virtual-machine.svg" x="273" y="120" width="22" height="22"/>
  <text x="284" y="157" text-anchor="middle" class="label">Master VM(s)</text>
  <text x="284" y="172" text-anchor="middle" class="sub">availability set + NIC/PIP/NSG</text>

  <rect x="196" y="192" width="176" height="72" rx="10" class="box"/>
  <image href="/assets/azure-icons/vm-scale-sets.svg" x="273" y="202" width="22" height="22"/>
  <text x="284" y="239" text-anchor="middle" class="label">Agent VMSS</text>
  <text x="284" y="254" text-anchor="middle" class="sub">autoscale settings</text>

  <rect x="432" y="70" width="176" height="72" rx="10" class="box-green"/>
  <text x="520" y="98" text-anchor="middle" class="label">Managed identity</text>
  <text x="520" y="115" text-anchor="middle" class="sub">role assignment for scale ops</text>

  <rect x="432" y="170" width="176" height="72" rx="10" class="box-accent"/>
  <image href="/assets/azure-icons/virtual-machine.svg" x="509" y="180" width="22" height="22"/>
  <text x="520" y="217" text-anchor="middle" class="label">Cloud-init bootstrap</text>
  <text x="520" y="232" text-anchor="middle" class="sub">k3s install + join/leave helper</text>

  <rect x="668" y="110" width="152" height="72" rx="10" class="box-green"/>
  <image href="/assets/azure-icons/kubernetes-services.svg" x="733" y="120" width="22" height="22"/>
  <text x="744" y="157" text-anchor="middle" class="label">k3s cluster</text>
  <text x="744" y="172" text-anchor="middle" class="sub">server, agents, shared /srv</text>

  <line x1="146" y1="122" x2="192" y2="64" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="146" y1="145" x2="192" y2="146" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="146" y1="168" x2="192" y2="228" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="372" y1="146" x2="428" y2="106" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="372" y1="228" x2="428" y2="206" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="608" y1="106" x2="664" y2="132" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="608" y1="206" x2="664" y2="160" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="420" y="282" text-anchor="middle" class="sub">actual template structure: separate storage/compute concerns, master identity, agent VM scale set, and cloud-init managed cluster membership</text>
</svg>
