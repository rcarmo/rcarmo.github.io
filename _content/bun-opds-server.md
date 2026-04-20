---
section: infrastructure
status: active
tagline: Read-only multi-library OPDS server for Calibre — built for the XteInk X4 and CrossPoint Reader.
---

## About
A lightweight OPDS catalogue server that fronts one or more Calibre libraries and serves books to any OPDS-compatible e-reader. Built with Bun for low memory use and fast cold-start — runs comfortably on a Raspberry Pi or NAS alongside Calibre. Includes KOReader progress sync via a kosync-compatible endpoint.

## How it works
At startup it scans the configured Calibre `metadata.db` files and builds an in-memory catalogue. Incoming OPDS requests are answered with Atom XML feeds; book files are streamed directly from the Calibre library folder. A separate `/kosync` route implements the KOReader book-progress sync protocol, storing positions in a small SQLite database at the top of the library tree.

## Features
### 📚 Multi-library support
Serve multiple Calibre libraries from a single process — each appears as a separate OPDS root catalogue.

### 📖 KOReader progress sync
Compatible with the KOReader kosync plugin — devices sync reading positions automatically over Wi-Fi.

### 🔍 Search & browse
Full OPDS search endpoint plus browse-by-author, browse-by-series, and browse-by-tag catalogue feeds.

### 📄 Format negotiation
Serves EPUB, PDF, CBZ, CBR, and other formats stored in the Calibre library; content-type headers are correct for each format.

### ⚡ Bun-native
Zero npm bloat — uses Bun's built-in HTTP server, SQLite driver, and file streaming for minimal overhead.

### 🐳 Docker-ready
Published as a multi-arch container image; mounts the Calibre library folder as a read-only volume.
