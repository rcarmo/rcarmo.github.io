---
section: infrastructure
status: stable
tagline: File thumbnails for RAW, HEIC, and 3D models in GNOME Files.
---

## About
Python thumbnailer scripts adding GNOME Files thumbnail support for RAW photos (CR2/NEF/ARW/ORF/RW2), HEIC/HEIF, and FBX/OBJ/STL 3D models. Register with make install — no restart required.

## How it works
Each script takes a source path and target PNG path. GNOME's thumbnailer infrastructure calls these in a bwrap sandbox when it encounters a registered MIME type. Scripts exit cleanly if a required library is missing — GNOME silently skips that file type without crashing anything.

## Features
### 📷 RAW formats
CR2, NEF, ARW, ORF, RW2 via rawpy.

### 🍎 HEIC/HEIF
Via Pillow's HEIF plugin.

### 🧊 3D files
FBX, OBJ, STL thumbnail renders.

### 🔧 Drop-in
make install, thumbnails appear immediately.
