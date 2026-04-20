---
section: cloud
status: maintained
tagline: Extract audio from media files and build transcripts and subtitles via Azure Speech Services.
---

## About
A command-line utility that takes a video or audio file, extracts the audio track with ffmpeg, sends it to Azure Cognitive Services Speech-to-Text, and writes out a transcript and SRT subtitle file. Useful for batch-processing recordings, meeting videos, or podcast archives where a human-quality transcript is needed without running a local model.

## How it works
ffmpeg extracts the audio stream and resamples it to the format Azure Speech expects (16 kHz mono WAV). The Azure Speech SDK streams the audio through the continuous recognition API, collecting timestamped phrases. The phrases are assembled into a plain-text transcript and an SRT file with accurate per-line timing, ready for upload to YouTube or embedding in a video player.

## Features
### 🎙️ Media file input
Accepts any format ffmpeg can decode — MP4, MKV, MOV, MP3, M4A, and more.

### 📝 Transcript output
Produces a clean plain-text transcript with speaker diacritisation where the Azure model supports it.

### 🎬 SRT subtitle export
Generates an SRT file with per-phrase timestamps — import directly into video editors or subtitle tools.

### ☁️ Azure Speech backend
Uses Azure Cognitive Services continuous recognition for high accuracy across accents and technical vocabulary.

### 📦 Simple CLI
Single Python script with minimal dependencies — `python transcribe.py input.mp4` and you're done.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" width="640" height="200">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #111520; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-b { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
      .bg-fill { fill: #111520; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: #f0f4fa; }
      .box { fill: #ffffff; stroke: #c8d0e0; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-b { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
      .bg-fill { fill: #f0f4fa; }
    }
    text { font-family: -apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
    </marker>
  </defs>
  <rect x="20" y="60" width="120" height="80" rx="8" class="box"/>
  <text x="80" y="98" text-anchor="middle" class="label">Media file</text>
  <text x="80" y="113" text-anchor="middle" class="sub">MP4/MP3/MKV</text>
  <rect x="200" y="20" width="130" height="60" rx="8" class="box-accent"/>
  <text x="265" y="53" text-anchor="middle" class="label">ffmpeg</text>
  <text x="265" y="68" text-anchor="middle" class="sub">16kHz mono WAV</text>
  <rect x="200" y="110" width="130" height="60" rx="8" class="box-warm"/>
  <text x="265" y="143" text-anchor="middle" class="label">Azure Speech</text>
  <text x="265" y="158" text-anchor="middle" class="sub">continuous recog.</text>
  <rect x="410" y="20" width="110" height="60" rx="8" class="box-b"/>
  <text x="465" y="53" text-anchor="middle" class="label">transcript</text>
  <text x="465" y="68" text-anchor="middle" class="sub">plain text</text>
  <rect x="410" y="110" width="110" height="60" rx="8" class="box-b"/>
  <text x="465" y="143" text-anchor="middle" class="label">subtitles</text>
  <text x="465" y="158" text-anchor="middle" class="sub">SRT file</text>
  <line x1="140" y1="100" x2="200" y2="70" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="140" y1="115" x2="200" y2="140" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="70" x2="410" y2="50" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="150" x2="410" y2="140" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
