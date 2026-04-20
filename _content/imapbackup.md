---
section: infrastructure
status: maintained
tagline: Incremental IMAP mailbox backup to local mbox files — works with Gmail, Exchange, and any IMAP server.
logo: assets/logos-opt/imapbackup.png
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
