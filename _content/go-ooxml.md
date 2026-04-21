---
section: libraries
status: experimental
created: 2026-01-30
tagline: A Go library for reading, writing, and manipulating Office Open XML documents.
logo: assets/logos-opt/go-ooxml.png
---

## About
go-ooxml is a pure Go library for working with Office Open XML (OOXML) documents — Word (.docx), Excel (.xlsx), and PowerPoint (.pptx). Built against the ECMA 376 specs, it aims to be the Go-native alternative to python-docx or Apache POI without pulling in external dependencies or CGo.

## How it works
OOXML documents are ZIP archives containing XML parts. go-ooxml unzips the archive, parses the relationships and content types, then provides typed access to the document model — paragraphs, runs, cells, slides. Changes are written back to the XML parts and re-zipped into a valid OOXML package.

The library handles the spec's complexity (shared strings in Excel, slide layouts in PowerPoint, paragraph numbering in Word) so calling code works at the content level rather than raw XML.

## Features
### 📄 Word support
Read and write .docx — paragraphs, runs, tables, headers, footers, styles.

### 📊 Excel support
Read and write .xlsx — sheets, rows, cells, shared strings, formulas.

### 📽 PowerPoint support
Read and write .pptx — slides, shapes, text frames, layouts.

### 🔧 Pure Go
No CGo, no external dependencies. Builds to a static binary on any Go-supported platform.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 230">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; stroke-width: 1.5; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; stroke-width: 1.5; }
      .box-green { fill: #0d2220; stroke: #207060; stroke-width: 1.5; }
      .box-warm { fill: #221a10; stroke: #a06020; stroke-width: 1.5; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; stroke-width: 1.5; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: transparent; }
      .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
      .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
      .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6" stroke="none"/>
    </marker>
  </defs>
  <rect width="660" height="230" class="bg" rx="8"/>

  <rect x="20" y="65" width="160" height="60" rx="8" class="box-accent"/>
  <text x="100" y="91" text-anchor="middle" class="label">.docx/.xlsx</text>
  <text x="100" y="109" text-anchor="middle" class="sub">ZIP archive</text>

  <rect x="250" y="24" width="160" height="60" rx="8" class="box-green"/>
  <text x="330" y="50" text-anchor="middle" class="label">Unzip</text>
  <text x="330" y="68" text-anchor="middle" class="sub">XML parts</text>

  <rect x="250" y="106" width="160" height="60" rx="8" class="box"/>
  <text x="330" y="132" text-anchor="middle" class="label">Typed model</text>
  <text x="330" y="150" text-anchor="middle" class="sub">paragraphs · cells</text>

  <rect x="480" y="65" width="160" height="60" rx="8" class="box-warm"/>
  <text x="560" y="91" text-anchor="middle" class="label">Re-zip</text>
  <text x="560" y="109" text-anchor="middle" class="sub">valid OOXML</text>


  <text x="330" y="218" text-anchor="middle" class="sub">pure Go — no CGo, no external deps</text>

  <polyline points="180,95 215,95 215,54 250,54" fill="none" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <polyline points="330,84 330,106" fill="none" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <polyline points="410,136 445,136 445,95 480,95" fill="none" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
</svg>
