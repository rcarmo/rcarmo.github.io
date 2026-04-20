---
section: macos
status: stable
tagline: Export your complete Apple Photos library — originals, edits, Live Photos, metadata.
---

## About
PhotosExport uses PhotoKit to export every PHAssetResource: originals, edited renders, Live Photo video pairs, burst frames, adjustment data. Deterministic YYYY/MM folder hierarchy, collision-safe naming, full JSON album manifest.

## How it works
PhotoKit sees everything Photos.app stores — not just what the export UI exposes. For each asset, it fetches all resource types: original file, edited full-size render, Live Photo video component, burst frames, and raw adjustment data. Files get deterministic timestamp names stable across re-runs. The JSON manifest records full album and folder membership.

## Features
### 📸 Every resource
Originals, edits, Live Photo videos, burst frames, adjustment data.

### 📂 Deterministic names
YYYYMMDDHHMMSSx.ext — stable, collision-safe.

### 🗂 Album manifest
JSON sidecar preserving album, smart album, and folder structure.

### 📋 Visible errors
Nothing fails silently — export_errors.log for every failure.
