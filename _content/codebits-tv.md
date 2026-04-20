---
section: infrastructure
status: maintained
tagline: Digital signage for hackathons and events — multicast video streaming to any screen on the LAN, the ghetto way.
---

## About
codebits-tv is a minimal Go server that streams video content to screens around a venue using IP multicast. Point it at a playlist of video files, plug screens into the LAN, and every display shows the same stream in sync — no HDMI matrix, no managed switches, no budget. Built for the Codebits hackathon and reused for similar events.

## How it works
The server reads a playlist, transcodes or repackages video via ffmpeg, and blasts the resulting UDP stream to a multicast group. Each display runs a lightweight receiver (VLC, ffplay, or a custom client) that joins the multicast group and renders the stream. A simple HTTP endpoint lets organisers update the playlist or switch content without touching the screens.

## Features
### 📺 IP multicast delivery
One sender, unlimited receivers — add screens without increasing server load or network traffic.

### 🎬 Playlist-driven
Define a playlist of video files or URLs; the server loops them and announces transitions over HTTP so clients can display titles.

### 🔧 ffmpeg pipeline
Video is fed through ffmpeg for format normalisation and timestamp injection — handles mixed source formats transparently.

### 🌐 HTTP control API
Simple REST endpoints to query status, update the playlist, and skip to the next item — controllable from any phone on the LAN.

### ⚡ Single binary
Compiled Go — deploy on any Linux box with ffmpeg installed; no other dependencies.
