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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 728 178">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
    .box-teal { fill: #ccfbf1; stroke: #0d9488; stroke-width: 1.5; }
    .box-slate { fill: #f1f5f9; stroke: #64748b; stroke-width: 1.5; }
    .box-indigo { fill: #e0e7ff; stroke: #4f46e5; stroke-width: 1.5; }
    .box-rose { fill: #ffe4e6; stroke: #e11d48; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #cffafe; stroke: #0891b2; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .box-teal { fill: #0d2228; stroke: #1a8a7a; }
      .box-slate { fill: #1e293b; stroke: #475569; }
      .box-indigo { fill: #1e1b4b; stroke: #6366f1; }
      .box-rose { fill: #2a0a12; stroke: #f43f5e; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #082f3a; stroke: #06b6d4; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
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
  <rect width="728" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">.docx / .xlsx</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Office documents</text>

  <rect x="262" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="274" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="364" y="56" text-anchor="middle" class="label">OOXML parser</text>
  <text x="364" y="74" text-anchor="middle" class="sub">ZIP + XML extraction</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">Document</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">paragraphs</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">Spreadsheet</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">rows/cells</text>

  <rect x="518" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="608" y="56" text-anchor="middle" class="label">Go structs</text>
  <text x="608" y="74" text-anchor="middle" class="sub">read · modify · write</text>

  <path d="M210,60 L274,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M454,60 L518,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="364" y="174" text-anchor="middle" class="sub">Pure Go OOXML parser — read and write .docx and .xlsx</text>
</svg>
