/* Surf Reader — temporary font picker (top-left)
   Reads fonts/fonts.yaml, registers @font-face blocks for every declared
   font, populates two dropdowns (Title + Subtitle), applies the user's
   choice to --display / --sans CSS variables, and remembers the selection
   in localStorage.

   YAML parsing uses js-yaml via CDN (loaded by index.html).
*/
(function () {
  const STORAGE_TITLE = "sr_title_font";
  const STORAGE_SUB = "sr_subtitle_font";

  function ensureJsYaml() {
    if (window.jsyaml) return Promise.resolve(window.jsyaml);
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js";
      s.crossOrigin = "anonymous";
      s.onload = () => resolve(window.jsyaml);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function loadCatalogue() {
    const yaml = await ensureJsYaml();
    const res = await fetch("fonts/fonts.yaml", { cache: "no-cache" });
    if (!res.ok) throw new Error(`fonts.yaml HTTP ${res.status}`);
    const text = await res.text();
    return yaml.load(text);
  }

  function registerFontFaces(catalogue) {
    const seen = new Set();
    const sheet = document.createElement("style");
    sheet.setAttribute("data-font-picker", "");
    const all = [
      ...(catalogue.title_fonts || []),
      ...(catalogue.subtitle_fonts || []),
    ];
    const rules = [];
    all.forEach((font) => {
      if (!font || !font.slug || seen.has(font.slug)) return;
      seen.add(font.slug);
      (font.files || []).forEach((f) => {
        const weight = f.weight || 400;
        const style = f.style || "normal";
        const url = `fonts/${font.slug}/${f.file}`;
        rules.push(`@font-face {
  font-family: "${font.family}";
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url("${url}") format("woff2");
}`);
      });
    });
    sheet.textContent = rules.join("\n");
    document.head.appendChild(sheet);
  }

  function probeFontPresence(font) {
    // Best-effort HEAD check on the first declared file
    const first = (font.files || [])[0];
    if (!first) return Promise.resolve(false);
    const url = `fonts/${font.slug}/${first.file}`;
    return fetch(url, { method: "HEAD", cache: "no-cache" })
      .then((r) => r.ok)
      .catch(() => false);
  }

  function buildSelect(id, fonts, currentFamily) {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.innerHTML = "";
    fonts.forEach((font) => {
      const opt = document.createElement("option");
      opt.value = font.family;
      opt.textContent = font.family;
      opt.style.fontFamily = `"${font.family}", ${font.fallback || "serif"}`;
      if (font._missing) opt.textContent += " (file missing)";
      sel.appendChild(opt);
    });
    if (currentFamily) sel.value = currentFamily;
  }

  function applyCSSVar(name, family, fallback) {
    document.documentElement.style.setProperty(
      name,
      `"${family}", ${fallback || (name === "--display" ? "ui-serif, Georgia, serif" : "system-ui, sans-serif")}`
    );
  }

  function statusEl() {
    return document.getElementById("fontPickerStatus");
  }

  function setStatus(msg) {
    const el = statusEl();
    if (el) el.textContent = msg;
  }

  function defaultFamily(fonts) {
    const d = fonts.find((f) => f.default);
    return d ? d.family : (fonts[0] && fonts[0].family);
  }

  function findFont(fonts, family) {
    return fonts.find((f) => f.family === family);
  }

  async function init() {
    const picker = document.getElementById("fontPicker");
    if (!picker) return;
    setStatus(
      (window.SR_I18N?.picker?.status_loading) || "Loading font catalogue…"
    );

    let catalogue;
    try {
      catalogue = await loadCatalogue();
    } catch (err) {
      console.error("[font-picker] failed to load fonts.yaml", err);
      setStatus(`Could not load fonts.yaml (${err.message}).`);
      return;
    }

    registerFontFaces(catalogue);

    const titleFonts = catalogue.title_fonts || [];
    const subFonts = catalogue.subtitle_fonts || [];

    // mark missing (best-effort)
    await Promise.all(
      [...titleFonts, ...subFonts].map(async (f) => {
        f._missing = !(await probeFontPresence(f));
      })
    );

    let savedTitle, savedSub;
    try {
      savedTitle = localStorage.getItem(STORAGE_TITLE);
      savedSub = localStorage.getItem(STORAGE_SUB);
    } catch (_) {}

    const initialTitle =
      (savedTitle && findFont(titleFonts, savedTitle) && savedTitle) ||
      defaultFamily(titleFonts);
    const initialSub =
      (savedSub && findFont(subFonts, savedSub) && savedSub) ||
      defaultFamily(subFonts);

    buildSelect("fontPickerTitle", titleFonts, initialTitle);
    buildSelect("fontPickerSub", subFonts, initialSub);

    const tInit = findFont(titleFonts, initialTitle);
    const sInit = findFont(subFonts, initialSub);
    if (tInit) applyCSSVar("--display", tInit.family, tInit.fallback);
    if (sInit) applyCSSVar("--sans", sInit.family, sInit.fallback);

    document
      .getElementById("fontPickerTitle")
      ?.addEventListener("change", (e) => {
        const f = findFont(titleFonts, e.target.value);
        if (!f) return;
        applyCSSVar("--display", f.family, f.fallback);
        try { localStorage.setItem(STORAGE_TITLE, f.family); } catch (_) {}
      });
    document
      .getElementById("fontPickerSub")
      ?.addEventListener("change", (e) => {
        const f = findFont(subFonts, e.target.value);
        if (!f) return;
        applyCSSVar("--sans", f.family, f.fallback);
        try { localStorage.setItem(STORAGE_SUB, f.family); } catch (_) {}
      });

    const collapseBtn = document.getElementById("fontPickerToggle");
    if (collapseBtn) {
      collapseBtn.addEventListener("click", () => {
        const collapsed = picker.getAttribute("data-collapsed") === "true";
        picker.setAttribute("data-collapsed", String(!collapsed));
        collapseBtn.textContent = collapsed
          ? (window.SR_I18N?.picker?.collapse || "—")
          : (window.SR_I18N?.picker?.expand || "+");
      });
    }

    const missingCount = [...titleFonts, ...subFonts].filter((f) => f._missing).length;
    if (missingCount > 0) {
      setStatus(
        (window.SR_I18N?.picker?.status_missing ||
          "Some font files are missing. See fonts/README.md.") +
          ` (${missingCount})`
      );
    } else {
      setStatus(
        (window.SR_I18N?.picker?.status_ready ||
          "Drop .woff2 files into fonts/<family>/ then refresh.")
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
