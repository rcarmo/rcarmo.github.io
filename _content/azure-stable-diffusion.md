---
section: ai-ml
status: stable
tagline: One-command Stable Diffusion on Azure GPU spot instances.
logo: assets/logos-opt/azure-stable-diffusion.png
---

## About
Makefile wrapping Azure Bicep. make deploy provisions an NC-series GPU spot VM and installs AUTOMATIC1111. make open opens an SSH tunnel. make destroy tears it down. Spot pricing keeps costs under $0.10/hour.

## How it works
make deploy runs a Bicep template that provisions a resource group, data disk, and GPU spot VM, then runs cloud-init to install CUDA and AUTOMATIC1111. Models live on an attached data disk that survives spot preemptions and teardowns. make destroy cleans up everything except the data disk configuration.

## Features
### ⚡ Three commands
make deploy, make open, make destroy. Under 10 minutes total.

### 💰 Spot pricing
NC6s_v3: typically under $0.10/hour.

### 💾 Persistent models
Data disk survives spot preemptions and redeployments.

## Posts
- [Very Stable Diffusion](https://taoofmac.com/space/blog/2022/09/03/1400) — 2022-09-03
- [A Diffuse Return](https://taoofmac.com/space/blog/2022/11/27/1800) — 2022-11-27
