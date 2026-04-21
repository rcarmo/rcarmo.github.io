---
section: cloud
status: maintained
created: 2025-11-22
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 230">
  <style>
    @media (prefers-color-scheme: dark) {
      .box { fill: #1a1e2a; stroke: #2a3040; stroke-width: 1.5; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; stroke-width: 1.5; }
      .box-green { fill: #0d2220; stroke: #207060; stroke-width: 1.5; }
      .label { fill: #d0daf0; }
      .sub { fill: #7f95b5; }
    }
    @media (prefers-color-scheme: light) {
      .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
      .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#5070a0"/></marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#3b82f6"/></marker>
  </defs>

  <rect x="20" y="82" width="140" height="66" rx="10" class="box"/>
  <text x="90" y="110" text-anchor="middle" class="label">Media file</text>
  <text x="90" y="127" text-anchor="middle" class="sub">MP4 / MOV / MP3 / MKV</text>

  <rect x="220" y="82" width="150" height="66" rx="10" class="box-accent"/>
  <text x="295" y="110" text-anchor="middle" class="label">ffmpeg</text>
  <text x="295" y="127" text-anchor="middle" class="sub">extract 16 kHz mono WAV</text>

  <rect x="430" y="82" width="150" height="66" rx="10" class="box-accent"/>
  <image href="/assets/azure-icons/speech-services.svg" x="444" y="100" width="22" height="22"/>
  <text x="508" y="110" text-anchor="middle" class="label">Azure Speech</text>
  <text x="508" y="127" text-anchor="middle" class="sub">continuous recognition</text>

  <rect x="640" y="28" width="100" height="66" rx="10" class="box-green"/>
  <text x="690" y="56" text-anchor="middle" class="label">Transcript</text>
  <text x="690" y="73" text-anchor="middle" class="sub">plain text</text>

  <rect x="640" y="136" width="100" height="66" rx="10" class="box-green"/>
  <text x="690" y="164" text-anchor="middle" class="label">Subtitles</text>
  <text x="690" y="181" text-anchor="middle" class="sub">SRT output</text>

  <line x1="160" y1="115" x2="216" y2="115" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="370" y1="115" x2="426" y2="115" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="580" y1="115" x2="636" y2="61" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="580" y1="115" x2="636" y2="169" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="380" y="222" text-anchor="middle" class="sub">timestamped phrases become a readable transcript and a subtitle file ready for upload</text>
</svg>
