---
section: infrastructure
status: archived
tagline: Auto-scaling Docker Swarm cluster for Azure — ARM template plus Makefile, manager and worker VMSS included.
logo: assets/logos-opt/azure-docker-swarm-cluster.png
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
