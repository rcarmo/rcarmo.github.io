---
section: apple
status: active
created: 2026-09-06
logo: assets/logos-opt/swift-smart-prompter.png
tagline: Local macOS meeting prompts from on-device transcription, talking points and Apple Intelligence.
---

## About
Smart Prompter keeps talking points visible during a call and suggests what to say next. A floating cue panel sits above the video-call window, while the main window holds the agenda and live transcript.

It runs on macOS 26, using on-device speech recognition and Apple Intelligence for contextual suggestions. No cloud API or account is required, and audio and transcripts are not written to disk.

## How it works
ScreenCaptureKit captures microphone and system audio separately. On-device speech recognition labels the microphone as "You" and system audio as "Call". This distinguishes your voice from the other side of the call, but does not identify individual remote participants.

The app compares the transcript with your talking points and tracks which ones have been covered. Apple Intelligence adds contextual coaching when available; otherwise, keyword matching tracks coverage and the cue panel shows the next uncovered item. You can also mark or unmark points yourself.

## Features
### Floating cue panel
A movable, resizable panel keeps the next prompt above the call window without covering the main agenda view.

### On-device transcription
Separate microphone and system-audio transcripts use the selected on-device speech recogniser.

### Contextual suggestions
Apple Intelligence suggests a short next response based on the conversation and remaining talking points.

### Manual agenda control
Mark or unmark topics during a call. Manually unchecking an automatically covered item keeps it uncovered for the rest of that session.

### Speech language selection
Choose an installed speech model or download another supported language from the app.

### Local processing
No cloud account or API key. Audio and transcripts stay off disk; contextual coaching is optional.

## Gallery
- [Smart Prompter](assets/screenshots/swift-smart-prompter.png) -- Floating cue panel and active talking points

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 968 178">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #707070; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #74a7ff; stroke: #012f7b; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #adadad; stroke: #000000; stroke-width: 1.5; }
    .box-teal { fill: #ebebeb; stroke: #474747; stroke-width: 1.5; }
    .box-slate { fill: #a7c6ff; stroke: #0042a9; stroke-width: 1.5; }
    .box-indigo { fill: #dfeed4; stroke: #4e7a27; stroke-width: 1.5; }
    .box-rose { fill: #dfeed4; stroke: #76bb40; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #d9c9fe; stroke: #5e30eb; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #243b53; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #505050; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0a1a3a; stroke: #4a80d0; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #222222; stroke: #666666; }
      .box-teal { fill: #1e1e1e; stroke: #666666; }
      .box-slate { fill: #0d1a38; stroke: #4a7ad0; }
      .box-indigo { fill: #1a2810; stroke: #5a8a30; }
      .box-rose { fill: #1a2810; stroke: #5aaa30; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #1a1030; stroke: #7040d0; }
      .label { fill: #d0daf0; }
      .sub { fill: #90a8c0; }
    }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6" stroke="none"/>
    </marker>
  </defs>
  <rect width="968" height="178" class="bg" rx="8"/>

  <rect x="22" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="34" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="124" y="64" text-anchor="middle" class="label">Call audio</text>
  <rect x="38" y="98" width="82" height="48" rx="6" class="box"/>
  <text x="79" y="126" text-anchor="middle" class="label" style="font-size:11px">Microphone</text>
  <rect x="128" y="98" width="82" height="48" rx="6" class="box"/>
  <text x="169" y="126" text-anchor="middle" class="label" style="font-size:11px">System audio</text>

  <rect x="278" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="368" y="64" text-anchor="middle" class="label">Speech recognition</text>

  <rect x="518" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="608" y="64" text-anchor="middle" class="label">Talking points</text>

  <rect x="758" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="848" y="64" text-anchor="middle" class="label">Floating cue</text>

  <path d="M214,60 L278,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M458,60 L518,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M698,60 L758,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="484" y="174" text-anchor="middle" class="sub">On-device call transcription and meeting prompts</text>
</svg>