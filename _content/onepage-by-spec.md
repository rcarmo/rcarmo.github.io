---
section: infrastructure
status: maintained
tagline: Keyboard-oriented browser homepage designed by LLM spec — bookmarks, search, and widgets, no mouse needed.
logo: assets/logos-opt/onepage-by-spec.png
---

## About
onepage-by-spec is a static single-file browser start page built by writing a precise spec first and letting an LLM generate the implementation. The result is a keyboard-driven homepage with configurable bookmarks, a command bar for quick searches, and lightweight widgets — all in one self-contained HTML file you can drop in your browser's new-tab slot or serve from a Raspberry Pi.

## How it works
The entire page is a single HTML file with inline CSS and vanilla JavaScript — no build step, no npm, no server required. The keyboard command bar intercepts key presses and dispatches to bookmarks, search engines, or widget actions. Configuration lives in a small JSON block at the top of the file. The spec-driven origin means the code is clean and well-commented — easy to fork and customise.

## Features
### ⌨️ Keyboard-first navigation
Type a shortcut to jump to a bookmark, trigger a search, or toggle a widget — no mouse required for common actions.

### 🔍 Multi-engine search
Configure any number of search engines with short prefixes — `g query` for Google, `gh query` for GitHub, etc.

### 📌 Bookmark groups
Organise bookmarks into labelled groups displayed as a clean grid — customise via the JSON config block.

### 🗂️ Single HTML file
No dependencies, no build step — copy one file to serve it from anywhere, including a browser `file://` URL.

### 🤖 Spec-driven origin
Written to demonstrate LLM spec methodology — the original spec is included alongside the generated code.
