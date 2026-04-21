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

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 230">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; stroke-width: 1.5; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; stroke-width: 1.5; }
      .box-green { fill: #0d2220; stroke: #207060; stroke-width: 1.5; }
      .box-warm { fill: #221a10; stroke: #a06020; stroke-width: 1.5; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; stroke-width: 1.5; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: transparent; }
      .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
      .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
      .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6" stroke="none"/>
    </marker>
  </defs>
  <rect width="660" height="230" class="bg" rx="8"/>

  <rect x="20" y="65" width="160" height="60" rx="8" class="box-accent"/>
  <text x="100" y="91" text-anchor="middle" class="label">IMAP Server</text>
  <text x="100" y="109" text-anchor="middle" class="sub">Gmail · Exchange</text>

  <rect x="250" y="24" width="160" height="60" rx="8" class="box"/>
  <text x="330" y="42" text-anchor="middle" class="label">imapbackup</text>
  <text x="330" y="59" text-anchor="middle" class="sub">→ append</text>
  <text x="330" y="74" text-anchor="middle" class="sub">Python script</text>

  <rect x="480" y="65" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="91" text-anchor="middle" class="label">Local mbox</text>
  <text x="560" y="109" text-anchor="middle" class="sub">one file/folder</text>

  <rect x="250" y="106" width="160" height="60" rx="8" class="box-warm"/>
  <text x="330" y="132" text-anchor="middle" class="label">State file</text>
  <text x="330" y="150" text-anchor="middle" class="sub">last UID/folder</text>

  <text x="330" y="218" text-anchor="middle" class="sub">← SSL/TLS</text>

  <path d="M180,95 L205,95 Q215,95 215,85 L215,64 Q215,54 225,54 L250,54" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <path d="M330,84 L330,106" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
</svg>
