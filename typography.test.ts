import { describe, expect, test } from "bun:test";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { proseDashes, proseDashesHtml } from "./typography";

describe("prose dashes", () => {
  test("spaced and closed-up prose, including multiple pairs", () => {
    expect(proseDashes("Go -- local inference. Fast--without a server."))
      .toBe("Go — local inference. Fast—without a server.");
    expect(proseDashes("one--two--three")).toBe("one—two—three");
    expect(proseDashes("already — done; single-hyphen; ---; ----"))
      .toBe("already — done; single-hyphen; ---; ----");
  });

  test("preserves flags and code, even when a command is not marked up", () => {
    for (const text of ["--help", "cmd --gpu --model=qwen", 'Use "--flag"',
      "`a--b`", "``code ` -- literal``"]) {
      expect(proseDashes(text)).toBe(text);
    }
    expect(proseDashes("Use `--help` -- then continue")).toBe("Use `--help` — then continue");
    expect(proseDashes("cmd --flag -- next")).toBe("cmd --flag — next");
  });

  test("preserves URLs and is idempotent", () => {
    const input = "https://host/a--b?q=--test -- see www.example.org/a--b and mailto:a--b@example.org";
    const output = "https://host/a--b?q=--test — see www.example.org/a--b and mailto:a--b@example.org";
    expect(proseDashes(input)).toBe(output);
    expect(proseDashes(output)).toBe(output);
  });
});

describe("HTML output typography", () => {
  test("covers headings, body, cards, captions and linked text", () => {
    const html = '<h2>One--two</h2><p>Go -- <strong>fast--local</strong></p>' +
      '<div class="card-desc">Small -- portable</div><figcaption>A -- B</figcaption>' +
      '<a href="/a--b?q=--yes" title="x > y -- literal">Read -- more</a>';
    expect(proseDashesHtml(html)).toBe('<h2>One—two</h2><p>Go — <strong>fast—local</strong></p>' +
      '<div class="card-desc">Small — portable</div><figcaption>A — B</figcaption>' +
      '<a href="/a--b?q=--yes" title="x > y -- literal">Read — more</a>');
  });

  test("does not rewrite comments, scripts, CSS, code blocks or diagrams", () => {
    const opaque = [
      '<!-- keep -- here -->',
      '<code>a--b --flag</code>',
      '<pre><code>cmd --help\n---\na--b</code></pre>',
      '<script>const x="a--b"; n--;</script>',
      '<style>:root { --color: red; } .x::after{content:" -- "}</style>',
      '<svg viewBox="0 0 10 10"><text>A -- B</text><path d="M0 0"/></svg>',
      '<textarea>literal -- input</textarea>',
      '<kbd>--help</kbd><samp>a--b</samp>',
      '<math><mtext>a--b</mtext></math>',
    ];
    for (const html of opaque) {
      expect(proseDashesHtml(html + '<p>After -- text</p>'))
        .toBe(html + '<p>After — text</p>');
    }
  });

  test("preserves all attributes, bare flags and visible URLs", () => {
    const html = '<p data-x="a--b">Use --help -- see https://host/a--b</p><img src="a--b.svg" alt="A -- B">';
    expect(proseDashesHtml(html)).toBe('<p data-x="a--b">Use --help — see https://host/a--b</p><img src="a--b.svg" alt="A -- B">');
  });
});

test("site build renders typography across all prose surfaces", () => {
  const dir = mkdtempSync(join(tmpdir(), "portfolio-typography-"));
  try {
    for (const name of ["build.ts", "typography.ts"]) cpSync(join(import.meta.dir, name), join(dir, name));
    mkdirSync(join(dir, "_content"));
    mkdirSync(join(dir, "assets/logos-opt"), { recursive: true });
    mkdirSync(join(dir, "assets/screenshots"));
    const diagram = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 20"><text>A -- B</text></svg>';
    writeFileSync(join(dir, "assets/logos-opt/logo.svg"), diagram);
    writeFileSync(join(dir, "assets/screenshots/shot--one.svg"), diagram);
    const source = [
      "---", "section: ai-ml", "status: active", "created: 2026-01-01", "featured: true",
      "logo: assets/logos-opt/logo.svg", "tagline: Fast -- local", "---", "",
      "## About", "Before--after. Use `a--b` and --help -- safely.", "",
      "<p>Raw -- prose <code>a--b</code></p>", "",
      "## Motivation", "Why -- now", "",
      "## How it works", "[Docs -- details](https://example.org/a--b)", "",
      "## Features", "### ⚡ Fast -- local", "Feature -- body", "",
      "## Gallery", "- [Shot -- title](assets/screenshots/shot--one.svg) -- Caption -- body", "",
      "## Posts", "- [Post -- title](https://example.org/post--name) — 2026-01-01", "",
      "## Releases", "Release -- notes", "",
      "## Diagram", diagram, "",
    ].join("\n");
    writeFileSync(join(dir, "_content/demo.md"), source);
    const run = Bun.spawnSync([process.execPath, "run", "build.ts"], { cwd: dir, stdout: "pipe", stderr: "pipe" });
    expect(run.exitCode, run.stderr.toString()).toBe(0);
    const html = readFileSync(join(dir, "projects/demo/index.html"), "utf8");
    for (const text of ["Fast — local", "Before—after", "Why — now", "Docs — details",
      "Feature — body", "Shot — title", "Caption — body", "Post — title", "Release — notes", "Raw — prose"]) {
      expect(html).toContain(text);
    }
    for (const text of ['href="https://example.org/a--b"', 'href="https://example.org/post--name"',
      '/assets/screenshots/shot--one.svg', '<code>a--b</code>', '--help — safely', diagram]) {
      expect(html).toContain(text);
    }
    expect(html).toContain('alt="Fast — local logo"');
    expect(html).toContain('aria-label="Shot — title"');
    expect(html).toContain('aria-label="Show slide 1: Shot — title"');
    for (const field of ['name="description"', 'property="og:description"', 'name="twitter:description"']) {
      expect(html).toContain(`${field} content="Fast — local"`);
    }
    expect(readFileSync(join(dir, "index.html"), "utf8")).toContain("Fast — local");
    expect(readFileSync(join(dir, "assets/og/demo.svg"), "utf8")).toContain("Fast — local");
    expect(readFileSync(join(dir, "_content/demo.md"), "utf8")).toBe(source);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
