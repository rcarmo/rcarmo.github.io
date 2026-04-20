---
section: macos
status: stable
tagline: Switch Steam accounts on a shared PC via HomeKit.
logo: assets/logos-opt/homekit-steam-user-switcher.png
---

## About
HAP-python service exposing each Steam account as a HomeKit Switch. Uses Steam's local --login flag — no Steam API, no Valve servers.

## How it works
HAP-python advertises a HomeKit bridge on the local network. When you flip a switch, on_set_value runs subprocess with Steam's --login flag. Steam's local CLI handles the account switch without any Web API calls. The service reads the current active account from the Steam registry file on startup.

## Features
### 🏠 HomeKit native
Siri, Shortcuts, automations all work.

### 🎮 No Steam API
Local --login flag only. No Valve network calls.

### 🐧 macOS and Linux
Runs as systemd service.

## Posts
- [Notes, 2025-12-24](https://taoofmac.com/space/notes/2025/12/24/1400) — 2025-12-24
