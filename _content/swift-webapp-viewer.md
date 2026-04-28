---
section: macos
status: active
created: 2026-04-28
logo: assets/logos-opt/swift-webapp-viewer.png
tagline: Chromeless macOS web app viewer — one URL, one native WebKit window, no browser furniture.
---

## About
The missing macOS web app wrapper: a tiny native Swift shell that opens a specific URL in a WebKit window with as little visible chrome as macOS will allow. No address bar, no tab strip, no bookmark bar — just the page in a native window. Safari Web Apps bring too much browser furniture; Web App Viewer brings none.

## How it works
Each window is a `WKWebView` that fills the frame. An invisible draggable strip at the top (right of the traffic lights) lets you move the window even with the titlebar suppressed. Traffic-light controls hide when the window isn't active. The default URL comes from `DefaultWebAppURL` in `Info.plist` — change it and rebuild. A Share Extension, a macOS Service, and a `webappviewer://open?url=` URI scheme round out the integration surface.

## Features
### 🪟 Chromeless WebKit window
No toolbar, no address bar, no fullscreen frame — just the page.

### 🎯 Opinionated single-URL default
Set `DefaultWebAppURL` in `Info.plist` once; it opens on launch.

### 📤 Share Extension + macOS Service
"Open in Web App Viewer" appears in the Services menu and the system Share sheet.

### 🔗 URI scheme
`webappviewer://open?url=…` for external integrations and scripts.

### 🖱 Invisible drag strip
Narrow draggable area lets you move the window without visible titlebar chrome.

### 📦 Single `make` build
One command; app bundle at `.build/WebAppViewer.app`.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 140">
  <style>
    @media (prefers-color-scheme: dark) {
      .box { fill:#1a1e2a; stroke:#2a3040; stroke-width:1.5; }
      .hi  { fill:#221a10; stroke:#a06020; stroke-width:1.5; }
      .hi2 { fill:#0d1e38; stroke:#2b5cb0; stroke-width:1.5; }
      .label{ fill:#d0daf0; } .sub{ fill:#5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .box { fill:#fff; stroke:#c8d0e0; stroke-width:1.5; }
      .hi  { fill:#fef3c7; stroke:#d97706; stroke-width:1.5; }
      .hi2 { fill:#dbeafe; stroke:#3b82f6; stroke-width:1.5; }
      .label{ fill:#1a2a40; } .sub{ fill:#5070a0; }
    }
    text { font-family:-apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label{ font-size:13px; font-weight:600; }
    .sub  { font-size:11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
  </defs>

  <!-- Entry points -->
  <rect x="8"   y="20" width="120" height="100" rx="8" class="box"/>
  <text x="68"  y="50" text-anchor="middle" class="label">URL Sources</text>
  <text x="68"  y="68" text-anchor="middle" class="sub">Info.plist default</text>
  <text x="68"  y="84" text-anchor="middle" class="sub">Share Extension</text>
  <text x="68"  y="100" text-anchor="middle" class="sub">webappviewer:// scheme</text>

  <line x1="128" y1="70" x2="164" y2="70" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- App -->
  <rect x="166" y="10" width="160" height="120" rx="8" class="hi"/>
  <text x="246" y="40" text-anchor="middle" class="label">Web App Viewer</text>
  <text x="246" y="58" text-anchor="middle" class="sub">Native Swift NSWindowController</text>
  <text x="246" y="74" text-anchor="middle" class="sub">Invisible drag strip</text>
  <text x="246" y="90" text-anchor="middle" class="sub">Traffic lights hidden</text>
  <text x="246" y="106" text-anchor="middle" class="sub">when window inactive</text>

  <line x1="326" y1="70" x2="362" y2="70" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- WKWebView -->
  <rect x="364" y="20" width="120" height="100" rx="8" class="hi2"/>
  <text x="424" y="58" text-anchor="middle" class="label">WKWebView</text>
  <text x="424" y="76" text-anchor="middle" class="sub">Full-frame WebKit</text>
  <text x="424" y="92" text-anchor="middle" class="sub">no browser chrome</text>

  <line x1="484" y1="70" x2="520" y2="70" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- Web -->
  <rect x="522" y="30" width="70" height="80" rx="8" class="box"/>
  <text x="557" y="62" text-anchor="middle" class="label">Web</text>
  <text x="557" y="79" text-anchor="middle" class="sub">any URL</text>
  <text x="557" y="95" text-anchor="middle" class="sub">or app</text>
</svg>
