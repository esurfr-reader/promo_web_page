#!/usr/bin/env node
/**
 * Post-`expo export` inliner. Walks dist/index.html, base64-encodes every
 * referenced JS / CSS / image / font into the document, and writes a
 * single self-contained file at dist/index.bundle.html.
 *
 * Usage:
 *   npm run build         # runs expo export, then this script
 *   npm run build:inline  # only this script (assumes dist/ exists)
 */
import { promises as fs } from "node:fs";
import { dirname, join, relative, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const HTML_IN = join(DIST, "index.html");
const HTML_OUT = join(DIST, "index.bundle.html");

const MIME = {
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".json": "application/json",
};

async function readMaybe(p) {
  try {
    return await fs.readFile(p);
  } catch {
    return null;
  }
}

function resolveAssetPath(href) {
  // strip query/hash
  const clean = href.split(/[?#]/)[0];
  if (clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("data:")) return null;
  // root-relative or relative
  return clean.startsWith("/") ? join(DIST, clean) : join(DIST, clean);
}

async function inlineHtml(html) {
  let inlined = html;

  // 1. <script src="..."></script>  →  <script>...</script>
  // While inlining JS, also replace any literal "/assets/<file>" string
  // references inside it with base64 data URIs so the resulting HTML is
  // truly self-contained (works opened via file://).
  inlined = await replaceAsync(
    inlined,
    /<script\b([^>]*)\bsrc=["']([^"']+)["']([^>]*)><\/script>/gi,
    async (_m, before, src, after) => {
      const fp = resolveAssetPath(src);
      const buf = fp && (await readMaybe(fp));
      if (!buf) return _m;
      let js = buf.toString("utf8");
      js = await replaceAsync(
        js,
        /(["'`])(\/assets\/[^"'`\s)]+)\1/g,
        async (_full, q, url) => {
          const ap = resolveAssetPath(url);
          const ab = ap && (await readMaybe(ap));
          if (!ab) return _full;
          const ext = extname(ap).toLowerCase();
          const mime = MIME[ext];
          if (!mime) return _full;
          return `${q}data:${mime};base64,${ab.toString("base64")}${q}`;
        },
      );
      const attrs = (before + " " + after).replace(/\s+/g, " ").trim();
      return `<script ${attrs}>${js}</script>`;
    },
  );

  // 2. <link rel="stylesheet" href="..."> → <style>...</style>
  inlined = await replaceAsync(
    inlined,
    /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi,
    async (_m, href) => {
      const fp = resolveAssetPath(href);
      const buf = fp && (await readMaybe(fp));
      if (!buf) return _m;
      return `<style>${buf.toString("utf8")}</style>`;
    },
  );

  // 3. <link rel="icon|preload|...">, <img src>, <source src>, etc. → data: URI
  inlined = await replaceAsync(
    inlined,
    /(<(?:link|img|source|use|video|audio|meta)\b[^>]*\b(?:href|src|content)=["'])([^"']+)(["'])/gi,
    async (_m, pre, url, post) => {
      const fp = resolveAssetPath(url);
      if (!fp) return _m;
      const buf = await readMaybe(fp);
      if (!buf) return _m;
      const ext = extname(fp).toLowerCase();
      const mime = MIME[ext];
      if (!mime) return _m;
      return `${pre}data:${mime};base64,${buf.toString("base64")}${post}`;
    },
  );

  // 4. CSS `url(...)` references inside inlined <style> blocks.
  inlined = inlined.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (block) => block);
  inlined = await replaceAsync(
    inlined,
    /<style\b([^>]*)>([\s\S]*?)<\/style>/gi,
    async (_m, attrs, css) => {
      const updated = await replaceAsync(
        css,
        /url\((['"]?)([^)'"]+)\1\)/gi,
        async (_full, q, u) => {
          const fp = resolveAssetPath(u);
          if (!fp) return _full;
          const buf = await readMaybe(fp);
          if (!buf) return _full;
          const ext = extname(fp).toLowerCase();
          const mime = MIME[ext];
          if (!mime) return _full;
          return `url("data:${mime};base64,${buf.toString("base64")}")`;
        },
      );
      return `<style${attrs}>${updated}</style>`;
    },
  );

  return inlined;
}

async function replaceAsync(str, regex, fn) {
  const matches = [];
  str.replace(regex, (...args) => {
    matches.push(args);
    return "";
  });
  let i = 0;
  const out = [];
  let last = 0;
  for (const m of matches) {
    const full = m[0];
    const idx = str.indexOf(full, last);
    out.push(str.slice(last, idx));
    out.push(await fn(...m));
    last = idx + full.length;
    i++;
  }
  out.push(str.slice(last));
  return out.join("");
}

(async () => {
  const html = await readMaybe(HTML_IN);
  if (!html) {
    console.error(`[inline] ${HTML_IN} not found - run \`npx expo export -p web\` first.`);
    process.exit(1);
  }
  const inlined = await inlineHtml(html.toString("utf8"));
  await fs.writeFile(HTML_OUT, inlined);
  const inSize = (await fs.stat(HTML_IN)).size;
  const outSize = (await fs.stat(HTML_OUT)).size;
  console.log(
    `[inline] ${relative(ROOT, HTML_IN)} (${(inSize / 1024).toFixed(1)} KB) → ${relative(ROOT, HTML_OUT)} (${(outSize / 1024).toFixed(1)} KB / ${(outSize / 1024 / 1024).toFixed(2)} MB)`,
  );
})();
