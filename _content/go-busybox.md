---
section: ai-agents
status: active
tagline: 57 BusyBox utilities in Go — 2 MB WASM binary, 387/387 tests passing.
---

## About
go-busybox implements 57 BusyBox-compatible utilities in Go. Compiles to a static native binary or a 2 MB WebAssembly module via TinyGo. All 387 BusyBox reference test cases pass.

## How it works
A multi-call binary: invoke as busybox ls or symlink a name to the binary. Each applet is a Go package under cmd/. The WASM target uses TinyGo for a 2 MB binary. OS-dependent operations return stubs under WASM so applets degrade gracefully without panicking.

## Features
### 📦 57 applets, 100% tests
ash, awk, grep, find, sed, ls, ps, tar, wget, and more.

### 🌐 2 MB WASM
TinyGo target. Run under wasmtime with no host access.

### 📦 Static binary
No shared libraries, no runtime deps, any GOARCH.

### 🛡 Sandbox-safe
OS-dependent applets stub under WASM.
