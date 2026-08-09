---
id: shelf
repo: rcarmo/shelf
section: apple
status: experimental
created: 2010-09-08
logo: assets/logos-opt/shelf.png
tagline: Native macOS context assistant that matches the frontmost app to Contacts and offers relevant actions.
---

## About
Shelf watches the frontmost macOS application, extracts a useful hint and tries to match it to a person or organisation in Contacts. It then offers actions for that app, contact and selected item.

The project is being migrated from its original Python/PyObjC implementation to a native Swift app for macOS 26. The earlier code remains under `legacy/` for reference.

## How it works
A monitor follows application activation and polls every two seconds. App-specific extractors read the active browser tab, selected Mail message, Finder selection or selected Contacts record. Other apps fall back to the focused window title through Accessibility.

Contacts resolves URLs, e-mail addresses, names and contact identifiers. Safari context adds Reading List state, previous visits and related pages ranked from local history. For Mail, Spotlight and Latent Semantic Mapping rank similar messages and learn likely destination mailboxes. The resulting context determines which automation actions Shelf can offer.

## Features
### Native Swift app
Built with Swift 6.2 and SwiftUI for macOS 26. The release script creates a signed or ad-hoc-signed `Shelf.app` bundle.

### Application context
Reads active tabs from Safari, Chrome, Edge and Brave; selected messages from Mail; Finder selections; Contacts selections; and focused window titles.

### Contact matching
Uses Contacts to resolve e-mail addresses, URLs, names and selected records without maintaining a separate address book.

### Safari context
Combines the active tab with local Safari Reading List and history data to show previous visits and related pages. History access is local and may require Full Disk Access.

### Mail assistance
Ranks similar messages with Spotlight, learns mailbox choices with Latent Semantic Mapping and suggests where the selected message should move.

### Optional Apple Intelligence
Can produce a short summary of similar Mail results and their filing pattern. The rest of Shelf works without model output.

### Contextual automation
Opens Contacts records, composes Mail, starts Messages, opens contact URLs, moves selected Mail, reveals Finder items, copies contact summaries and returns focus to the source app.

### Permission controls
Contacts, Accessibility, Automation and Full Disk Access are requested only for the features that need them.

### Preserved legacy app
The original Python/PyObjC implementation and py2app build remain available under `legacy/`.

## Posts
- [The Return of Shelf](https://taoofmac.com/space/blog/2026/07/10/1330) — 2026-07-10

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 202">
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
      .sub { fill: #90a8c0; }
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
  <rect width="960" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Frontmost app</text>
  <text x="120" y="74" text-anchor="middle" class="sub">browser · Mail · Finder · Contacts</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">Context extractors</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Apple Events · Accessibility</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">Contacts resolver</text>
  <text x="600" y="74" text-anchor="middle" class="sub">URL · e-mail · name · ID</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="600" y="144" text-anchor="middle" class="label">Local context</text>
  <text x="600" y="162" text-anchor="middle" class="sub">Safari history · Mail ranking</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Shelf actions</text>
  <text x="840" y="74" text-anchor="middle" class="sub">open · compose · move · reveal</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="840" y="144" text-anchor="middle" class="label">Optional summary</text>
  <text x="840" y="162" text-anchor="middle" class="sub">Apple Intelligence</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,134 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,148 L750,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,148 L706,148 Q720,148 720,134 L720,74 Q720,60 734,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="480" y="198" text-anchor="middle" class="sub">Frontmost application context to contact-aware actions</text>
</svg>
