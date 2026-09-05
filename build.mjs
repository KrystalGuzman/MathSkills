#!/usr/bin/env node
/**
 * Builds the deployable site from the single source file.
 *
 * `numeracy-probe.html` is authored as an Artifact body fragment: it opens with
 * <title>, a font <link> and one <style> block, then the markup, with no
 * document scaffolding, because the Artifact host supplies <!doctype>, <head>
 * and <body> at publish time. A web server supplies nothing, so this script
 * wraps the same bytes in a real HTML document for GitHub Pages.
 *
 *   node build.mjs           -> ./index.html
 *   node build.mjs site      -> ./site/index.html and ./site/.nojekyll
 *
 * Everything above and including the first </style> becomes the head; the rest
 * becomes the body. There is exactly one <style> block in the source, so the
 * split point is unambiguous — the script asserts that before writing.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const SRC = "numeracy-probe.html";
const outDir = process.argv[2] || ".";
const src = readFileSync(SRC, "utf8");

// The inline script emits <style> strings of its own for downloaded reports, so
// only the region before the first <script> is considered when locating the split.
const cut = src.indexOf("</style>");
const firstScript = src.indexOf("<script");
if (cut === -1) {
  console.error(`${SRC}: no </style> found — cannot split head from body.`);
  process.exit(1);
}
if (firstScript !== -1 && cut > firstScript) {
  console.error(`${SRC}: the first </style> follows the first <script> — head/body split is unsafe.`);
  process.exit(1);
}
const styleOpens = (src.slice(0, cut).match(/<style\b/g) || []).length;
if (styleOpens !== 1) {
  console.error(`${SRC}: expected exactly one page <style> block before the split, found ${styleOpens}.`);
  process.exit(1);
}
const head = src.slice(0, cut + "</style>".length);
const body = src.slice(cut + "</style>".length);

const DESCRIPTION =
  "An informal, dynamically generated probe of the cognitive domains implicated in " +
  "dyscalculia and math learning differences, producing a printable diagnostic profile.";

// Triangular-ruler favicon, inlined so the page carries no external requests but fonts.
const FAVICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
      '<rect width="32" height="32" rx="5" fill="#1C6A66"/>' +
      '<path d="M7 24 L25 24 L7 7 Z" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<path d="M11 24 L11 21 M15 24 L15 21 M19 24 L19 21" stroke="#fff" stroke-width="1.7"/>' +
    "</svg>"
  );

// Mirrors the small reset the Artifact host injects, so the page renders
// identically whether it is served here or published as an Artifact.
const RESET =
  "<style>\n" +
  ":root{color-scheme:light dark}\n" +
  "body{margin:0}\n" +
  "img{max-width:100%}\n" +
  "[hidden]{display:none!important}\n" +
  "</style>";

const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${DESCRIPTION}">
<meta name="robots" content="noindex">
<link rel="icon" href="${FAVICON}">
${RESET}
${head}
</head>
<body>
${body.replace(/^\n+/, "")}
</body>
</html>
`;

if (outDir !== ".") mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "index.html"), doc);
if (outDir !== ".") writeFileSync(join(outDir, ".nojekyll"), "");
console.log(`wrote ${join(outDir, "index.html")} (${doc.length.toLocaleString()} bytes)`);
