---
section: terminal
status: maintained
created: 2013-10-24
tagline: Incremental IMAP mailbox backup to local mbox files — works with Gmail, Exchange, and any IMAP server.
---

## About
imapbackup is a single-file Python script that connects to any IMAP server and downloads your email to local mbox files, incrementally. It only fetches messages it hasn't seen before, making subsequent runs fast even on large mailboxes. Works with Gmail (via app passwords), Exchange, Fastmail, and any standard IMAP server. A long-standing community reference for DIY mail archiving with 343 stars and 68 forks.

## How it works
Connects over IMAP (SSL/TLS or STARTTLS), lists all folders, and for each folder downloads any message UIDs not already present in the local mbox. Messages are written to one mbox file per folder in a directory of your choosing. A simple status file tracks the last seen UID per folder so re-runs are fast and safe — interrupted backups resume cleanly.

## Features
### 📬 Incremental downloads
Only fetches new messages since the last run — safe to schedule as a daily cron job without re-downloading everything.

### 📁 Per-folder mbox files
One mbox file per IMAP folder, organised in a directory tree that mirrors the server's folder hierarchy.

### 🔒 SSL/TLS support
Connects over IMAPS (port 993) or upgrades via STARTTLS — compatible with any server that supports standard IMAP security.

### 📧 Gmail & Exchange compatible
Tested with Gmail (app passwords), Microsoft 365, Fastmail, Dovecot, and Cyrus IMAP.

### 🐍 Single-file script
No dependencies beyond the Python standard library — copy one file, run it, done.

## Posts
- [Python](https://taoofmac.com/space/dev/python) — 2026-04-25

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 202">
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
    .sub { fill: #5070a0; }
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
      .sub { fill: #5070a0; }
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
  <rect width="720" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="120" y="56" text-anchor="middle" class="label">IMAP server</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Gmail · Exchange · Fastmail</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-teal"/>
  <text x="360" y="56" text-anchor="middle" class="label">imapbackup</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Python script · append-only</text>

  <rect x="270" y="118" width="180" height="60" rx="8" class="box-accent"/>
  <text x="360" y="144" text-anchor="middle" class="label">State file</text>
  <text x="360" y="162" text-anchor="middle" class="sub">last UID per folder</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="600" y="56" text-anchor="middle" class="label">Local mbox files</text>
  <text x="600" y="74" text-anchor="middle" class="sub">one file per IMAP folder</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M360,90 L360,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="360" y="198" text-anchor="middle" class="sub">Incremental runs fetch only unseen message UIDs</text>
</svg>
