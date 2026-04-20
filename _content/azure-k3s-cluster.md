---
section: infrastructure
status: archived
tagline: Azure ARM template to deploy a lightweight Kubernetes cluster using k3s — one make target, running in minutes.
logo: assets/logos-opt/azure-k3s-cluster.png
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
