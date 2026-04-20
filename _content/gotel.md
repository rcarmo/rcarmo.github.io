---
section: infrastructure
status: active
tagline: Self-contained OTel collector — SQLite storage, built-in trace viewer.
---

## About
Single-binary OpenTelemetry Collector storing traces and metrics in SQLite with a built-in web trace viewer. OTLP gRPC 4317, HTTP 4318, query API 3200, viewer 3000. No Jaeger, no Tempo, no Grafana needed.

## How it works
A complete OTel Collector pipeline in one binary: OTLP endpoints → memory_limiter → batch processor → SQLite. The built-in query server exposes trace data as REST; the web viewer provides a Jaeger-like UI. One binary, one file, zero external storage.

## Features
### 📦 Single binary
go build -o gotel . and run. Embedded config.

### 🗄 SQLite storage
Traces in a local file. No external dependency.

### 🌐 Built-in viewer
Jaeger-like UI at :3000.

### 📊 Standard OTLP
gRPC 4317 + HTTP 4318. Drop-in collector.
