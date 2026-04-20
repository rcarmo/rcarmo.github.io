---
section: libraries
status: experimental
created: 2026-01-30
tagline: A Go library for reading, writing, and manipulating Office Open XML documents.
logo: assets/logos-opt/missing-0.png
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
