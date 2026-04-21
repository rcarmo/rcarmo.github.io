---
section: cloud
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 240">
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

  <rect x="20" y="88" width="120" height="66" rx="10" class="box"/>
  <image href="/assets/azure-icons/templates.svg" x="32" y="106" width="22" height="22"/>
  <text x="82" y="116" text-anchor="middle" class="label">ARM template</text>
  <text x="82" y="133" text-anchor="middle" class="sub">make deploy</text>

  <rect x="190" y="88" width="150" height="66" rx="10" class="box-accent"/>
  <image href="/assets/azure-icons/virtual-machine.svg" x="204" y="106" width="22" height="22"/>
  <text x="268" y="116" text-anchor="middle" class="label">k3s server VM</text>
  <text x="268" y="133" text-anchor="middle" class="sub">cloud-init installs k3s</text>

  <rect x="390" y="28" width="150" height="66" rx="10" class="box-green"/>
  <image href="/assets/azure-icons/kubernetes-services.svg" x="404" y="46" width="22" height="22"/>
  <text x="468" y="56" text-anchor="middle" class="label">k3s control plane</text>
  <text x="468" y="73" text-anchor="middle" class="sub">API + kubeconfig</text>

  <rect x="390" y="148" width="150" height="66" rx="10" class="box"/>
  <image href="/assets/azure-icons/virtual-machine.svg" x="404" y="166" width="22" height="22"/>
  <text x="468" y="176" text-anchor="middle" class="label">agent VMs</text>
  <text x="468" y="193" text-anchor="middle" class="sub">join server on boot</text>

  <rect x="590" y="88" width="150" height="66" rx="10" class="box-green"/>
  <image href="/assets/azure-icons/kubernetes-services.svg" x="604" y="106" width="22" height="22"/>
  <text x="666" y="116" text-anchor="middle" class="label">Ready cluster</text>
  <text x="666" y="133" text-anchor="middle" class="sub">kubectl works immediately</text>

  <line x1="140" y1="121" x2="186" y2="121" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="340" y1="121" x2="386" y2="61" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="340" y1="121" x2="386" y2="181" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="540" y1="61" x2="586" y2="112" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="540" y1="181" x2="586" y2="130" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="380" y="232" text-anchor="middle" class="sub">template parameters control VM size, node count, and k3s version — no AKS control plane required</text>
</svg>
