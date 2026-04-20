---
section: infrastructure
status: active
created: 2026-01-08
tagline: Self-contained OTel collector — SQLite storage, built-in trace viewer.
logo: assets/logos-opt/gotel.png
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

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" width="640" height="200">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #111520; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-b { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
      .bg-fill { fill: #111520; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: #f0f4fa; }
      .box { fill: #ffffff; stroke: #c8d0e0; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-b { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
      .bg-fill { fill: #f0f4fa; }
    }
    text { font-family: -apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
    </marker>
  </defs>
  <rect x="20" y="60" width="120" height="80" rx="8" class="box"/>
  <text x="80" y="98" text-anchor="middle" class="label">Services</text>
  <text x="80" y="113" text-anchor="middle" class="sub">OTLP traces</text>
  <rect x="200" y="20" width="130" height="60" rx="8" class="box-accent"/>
  <text x="265" y="53" text-anchor="middle" class="label">OTLP receiver</text>
  <text x="265" y="68" text-anchor="middle" class="sub">gRPC / HTTP</text>
  <rect x="200" y="110" width="130" height="60" rx="8" class="box-warm"/>
  <text x="265" y="143" text-anchor="middle" class="label">SQLite store</text>
  <text x="265" y="158" text-anchor="middle" class="sub">spans + events</text>
  <rect x="410" y="60" width="130" height="80" rx="8" class="box-b"/>
  <text x="475" y="98" text-anchor="middle" class="label">Trace UI</text>
  <text x="475" y="113" text-anchor="middle" class="sub">built-in viewer</text>
  <line x1="140" y1="100" x2="200" y2="80" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="265" y1="80" x2="265" y2="110" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="80" x2="410" y2="80" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="140" x2="410" y2="110" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
