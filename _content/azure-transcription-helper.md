---
section: ai-ml
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
