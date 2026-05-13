/* Surf Reader — i18n loader
   Fetches lang/<code>.json and swaps content on:
     [data-i18n="key.path"]            → textContent
     [data-i18n-html="key.path"]       → innerHTML
     [data-i18n-attr="attr:key,..."]   → element attributes
     [data-i18n-repeat="arr.key"]      → clones <template data-i18n-template>
                                          per array item; inside the template,
                                          [data-item="k"], [data-item-html="k"]
                                          and [data-item-attr="a:k,..."] are
                                          filled from each item object.
     [data-i18n-langstrip="arr.key"]   → re-renders the dot-separated hero strip
                                          (array of plain strings).
     [data-i18n-bullets="arr.key"]     → fills each <li>'s .bullet-text span.
   Exposes window.SR_I18N for interactive widgets to read live strings.
*/
(function () {
  const SUPPORTED = ["en", "es", "pt", "ja", "fr"];
  const DEFAULT_LANG = "en";
  const STORAGE_KEY = "sr_lang";

  function readPath(obj, path) {
    return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
  }

  function setText(el, value) {
    if (value == null) return;
    if (Array.isArray(value)) value = value.join(" · ");
    el.textContent = String(value);
  }

  function setHTML(el, value) {
    if (value == null) return;
    el.innerHTML = String(value);
  }

  function applyAttrSpec(el, spec, source) {
    if (!spec) return;
    spec.split(",").forEach((pair) => {
      const idx = pair.indexOf(":");
      if (idx === -1) return;
      const attr = pair.slice(0, idx).trim();
      const key = pair.slice(idx + 1).trim();
      const v = source ? source[key] : null;
      if (v != null) el.setAttribute(attr, String(v));
    });
  }

  function applyTopLevel(dict) {
    document.documentElement.lang = readPath(dict, "doc.html_lang") || dict._meta?.lang || "en";
    const title = readPath(dict, "doc.title");
    if (title) document.title = title;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = readPath(dict, el.getAttribute("data-i18n"));
      if (v != null) setText(el, v);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const v = readPath(dict, el.getAttribute("data-i18n-html"));
      if (v != null) setHTML(el, v);
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const spec = el.getAttribute("data-i18n-attr");
      spec.split(",").forEach((pair) => {
        const idx = pair.indexOf(":");
        if (idx === -1) return;
        const attr = pair.slice(0, idx).trim();
        const key = pair.slice(idx + 1).trim();
        const v = readPath(dict, key);
        if (v != null) el.setAttribute(attr, String(v));
      });
    });
  }

  function applyRepeaters(dict) {
    document.querySelectorAll("[data-i18n-repeat]").forEach((host) => {
      const arr = readPath(dict, host.getAttribute("data-i18n-repeat"));
      if (!Array.isArray(arr)) return;
      const tpl = host.querySelector("template[data-i18n-template]");
      if (!tpl) return;
      host.querySelectorAll("[data-i18n-rendered]").forEach((n) => n.remove());

      arr.forEach((item, idx) => {
        const clone = tpl.content.firstElementChild.cloneNode(true);
        clone.setAttribute("data-i18n-rendered", "");

        clone.querySelectorAll("[data-item]").forEach((el) => {
          const k = el.getAttribute("data-item");
          if (item[k] == null) {
            el.remove();
          } else {
            setText(el, item[k]);
          }
        });
        clone.querySelectorAll("[data-item-html]").forEach((el) => {
          const k = el.getAttribute("data-item-html");
          if (item[k] == null) {
            el.remove();
          } else {
            setHTML(el, item[k]);
          }
        });
        clone.querySelectorAll("[data-item-attr]").forEach((el) => {
          applyAttrSpec(el, el.getAttribute("data-item-attr"), item);
        });
        clone.querySelectorAll("[data-item-index]").forEach((el) => {
          setText(el, String(idx + 1));
        });
        host.appendChild(clone);
      });
    });
  }

  function applyLangStrip(dict) {
    document.querySelectorAll("[data-i18n-langstrip]").forEach((host) => {
      const arr = readPath(dict, host.getAttribute("data-i18n-langstrip"));
      if (!Array.isArray(arr)) return;
      host.innerHTML = "";
      arr.forEach((s, i) => {
        const code = SUPPORTED[i];
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "lang-chip-hero";
        chip.setAttribute("data-lang", code || "");
        const label = document.createElement("span");
        label.className = "label";
        label.textContent = s;
        const sub = document.createElement("span");
        sub.className = "sub";
        sub.textContent = (code || "").toUpperCase();
        chip.appendChild(label);
        chip.appendChild(sub);
        if (code && window.SR_I18N_LANG === code) chip.classList.add("active");
        if (code) chip.addEventListener("click", () => loadLang(code));
        host.appendChild(chip);
      });
    });
  }

  function applyBullets(dict) {
    document.querySelectorAll("[data-i18n-bullets]").forEach((host) => {
      const arr = readPath(dict, host.getAttribute("data-i18n-bullets"));
      if (!Array.isArray(arr)) return;
      const lis = host.querySelectorAll("li");
      arr.forEach((text, i) => {
        const li = lis[i];
        if (!li) return;
        const slot = li.querySelector(".bullet-text");
        if (slot) slot.textContent = text;
        else li.appendChild(document.createTextNode(text));
      });
    });
  }

  function highlightLangButton(lang) {
    document.querySelectorAll(".lang-picker button[data-lang]").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
  }

  async function loadLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    try {
      const res = await fetch(`lang/${lang}.json`, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const dict = await res.json();
      window.SR_I18N = dict;
      window.SR_I18N_LANG = lang;
      applyTopLevel(dict);
      applyRepeaters(dict);
      applyLangStrip(dict);
      applyBullets(dict);
      highlightLangButton(lang);
      highlightBottomLangChips(lang);
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
      window.dispatchEvent(new CustomEvent("sr:lang-changed", { detail: { lang, dict } }));
    } catch (err) {
      console.error("[i18n] failed to load", lang, err);
      if (lang !== DEFAULT_LANG) loadLang(DEFAULT_LANG);
    }
  }

  function mountBottomLangChips() {
    document.querySelectorAll(".langs .lang-chip").forEach((chip, i) => {
      const code = SUPPORTED[i];
      if (!code) return;
      chip.setAttribute("data-lang", code);
      chip.setAttribute("role", "button");
      chip.setAttribute("tabindex", "0");
      chip.addEventListener("click", () => loadLang(code));
      chip.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); loadLang(code); }
      });
    });
  }

  function highlightBottomLangChips(lang) {
    document.querySelectorAll(".langs .lang-chip[data-lang]").forEach((c) => {
      c.classList.toggle("active", c.getAttribute("data-lang") === lang);
    });
  }

  function mountLangPicker() {
    const host = document.getElementById("langPicker");
    if (!host) return;
    host.innerHTML = "";
    SUPPORTED.forEach((code) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("data-lang", code);
      b.textContent = code.toUpperCase();
      b.addEventListener("click", () => loadLang(code));
      host.appendChild(b);
    });
  }

  function pickInitialLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored)) return stored;
    } catch (_) {}
    const nav = (navigator.language || navigator.userLanguage || "en").slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : DEFAULT_LANG;
  }

  document.addEventListener("DOMContentLoaded", () => {
    mountLangPicker();
    mountBottomLangChips();
    loadLang(pickInitialLang());
  });

  window.SR_setLang = loadLang;
})();
