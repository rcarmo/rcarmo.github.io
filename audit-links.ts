#!/usr/bin/env bun
/**
 * Link audit — checks all internal href/src references in generated HTML.
 * Run after build: bun audit-links.ts
 * Exit code 0 = all OK, 1 = broken links found.
 */
import { existsSync, readFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { $ } from "bun";

const ROOT = process.cwd();
const errors: string[] = [];
const checked = new Set<string>();

// Find all HTML files using shell
const htmlFiles = (await $`find ${ROOT} -name "*.html" -not -path "*/.git/*" -not -path "*/node_modules/*"`.text())
  .trim().split("\n").filter(Boolean);

console.log(`Auditing ${htmlFiles.length} HTML files...\n`);

// Extract href="..." and src="..." from HTML (skip external/data/anchor)
const refRe = /(?:href|src)="([^"]+)"/g;

for (const file of htmlFiles) {
  const relFile = file.replace(ROOT + "/", "");
  const html = readFileSync(file, "utf-8");
  let m: RegExpExecArray | null;

  while ((m = refRe.exec(html)) !== null) {
    const val = m[1];
    if (/^(https?:|data:|javascript:|mailto:|#|')/.test(val)) continue;

    const key = `${relFile}::${val}`;
    if (checked.has(key)) continue;
    checked.add(key);

    // Strip query string and fragment
    const clean = val.split("?")[0].split("#")[0];

    // Resolve to filesystem path
    let fsPath: string;
    if (clean.startsWith("/")) {
      fsPath = join(ROOT, clean);
    } else {
      fsPath = resolve(dirname(file), clean);
    }

    // Check existence: trailing / expects dir with index.html
    let ok = false;
    if (clean.endsWith("/")) {
      ok = existsSync(join(fsPath, "index.html"));
    } else {
      ok = existsSync(fsPath);
    }

    if (!ok) {
      errors.push(`${relFile} → ${val}`);
    }
  }
}

// Summary
if (errors.length) {
  console.log(`❌ ${errors.length} broken link(s):\n`);
  for (const e of errors) console.log(`  ${e}`);
} else {
  console.log("✅ All internal links OK");
}

console.log(`\nChecked ${checked.size} unique references across ${htmlFiles.length} files`);
process.exit(errors.length ? 1 : 0);
