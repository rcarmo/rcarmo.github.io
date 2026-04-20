---
section: infrastructure
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
  <rect x="20" y="20" width="140" height="60" rx="8" class="box-accent"/>
  <text x="90" y="55" text-anchor="middle" class="label">IMAP Server</text>
  <text x="90" y="70" text-anchor="middle" class="sub">Gmail · Exchange</text>
  <rect x="250" y="20" width="140" height="60" rx="8" class="box"/>
  <text x="320" y="55" text-anchor="middle" class="label">imapbackup</text>
  <text x="320" y="70" text-anchor="middle" class="sub">Python script</text>
  <rect x="480" y="20" width="140" height="60" rx="8" class="box-b"/>
  <text x="550" y="55" text-anchor="middle" class="label">Local mbox</text>
  <text x="550" y="70" text-anchor="middle" class="sub">one file/folder</text>
  <line x1="160" y1="50" x2="250" y2="50" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="250" y="110" width="140" height="60" rx="8" class="box-warm"/>
  <text x="320" y="145" text-anchor="middle" class="label">State file</text>
  <text x="320" y="160" text-anchor="middle" class="sub">last UID/folder</text>
  <line x1="320" y1="80" x2="320" y2="110" class="arrow" stroke-width="1.5"/>
  <text x="205" y="44" text-anchor="middle" class="sub">← SSL/TLS</text>
  <text x="390" y="44" text-anchor="middle" class="sub">→ append</text>
</svg>
