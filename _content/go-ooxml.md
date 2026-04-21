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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 180" width="520" height="180">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #21262d; stroke: #30363d; }
      .box-accent { fill: #0d2340; stroke: #2b6cb0; }
      .box-green { fill: #0d2a1f; stroke: #2a7a3a; }
      .box-warm { fill: #2a1e18; stroke: #c87020; }
      .label { fill: #e8e8e8; font-size: 13px; font-weight: 600; }
      .sub { fill: #8b949e; font-size: 11px; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: transparent; }
      .box { fill: #ffffff; stroke: #d0d7de; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-green { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .label { fill: #1a2a40; font-size: 13px; font-weight: 600; }
      .sub { fill: #6b7280; font-size: 11px; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
    </marker>
  </defs>
  <rect x="20" y="60" width="100" height="60" rx="8" class="box-accent"/>
  <text x="70" y="87" text-anchor="middle" class="label">.docx/.xlsx</text>
  <text x="70" y="103" text-anchor="middle" class="sub">ZIP archive</text>
  <rect x="170" y="30" width="120" height="50" rx="8" class="box-green"/>
  <text x="230" y="52" text-anchor="middle" class="label">Unzip</text>
  <text x="230" y="68" text-anchor="middle" class="sub">XML parts</text>
  <rect x="170" y="100" width="120" height="50" rx="8" class="box"/>
  <text x="230" y="122" text-anchor="middle" class="label">Typed model</text>
  <text x="230" y="138" text-anchor="middle" class="sub">paragraphs · cells</text>
  <rect x="360" y="60" width="120" height="60" rx="8" class="box-warm"/>
  <text x="420" y="87" text-anchor="middle" class="label">Re-zip</text>
  <text x="420" y="103" text-anchor="middle" class="sub">valid OOXML</text>
  <line x1="120" y1="80" x2="170" y2="55" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="230" y1="80" x2="230" y2="100" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="290" y1="125" x2="360" y2="100" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="260" y="170" text-anchor="middle" class="sub">pure Go — no CGo, no external deps</text>
</svg>
