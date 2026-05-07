import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LNGS, type Lng } from "../i18n/i18n";

const LANG_LABELS: Record<Lng, { name: string; code: string }> = {
  en: { name: "English", code: "EN" },
  es: { name: "Español", code: "ES" },
  pt: { name: "Português", code: "PT" },
  ja: { name: "日本語", code: "JA" },
  fr: { name: "Français", code: "FR" },
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = (i18n.resolvedLanguage ?? i18n.language ?? "en").split("-")[0] as Lng;

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 14,
        right: 14,
        zIndex: 100,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 12px",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: ".08em",
          color: "var(--ink)",
          background: "rgba(255,255,255,.92)",
          border: "1px solid var(--line)",
          borderRadius: 999,
          backdropFilter: "blur(8px)",
          boxShadow: "var(--shadow-sm)",
          cursor: "pointer",
        }}
      >
        🌐 {LANG_LABELS[current].code}
        <span style={{ fontSize: 9, opacity: 0.6 }}>▾</span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            margin: 0,
            padding: 6,
            background: "white",
            border: "1px solid var(--line)",
            borderRadius: 12,
            boxShadow: "var(--shadow-md)",
            listStyle: "none",
            minWidth: 160,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {SUPPORTED_LNGS.map((lng) => {
            const isActive = current === lng;
            return (
              <li key={lng}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    i18n.changeLanguage(lng);
                    setOpen(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 10px",
                    background: isActive ? "var(--paper-2)" : "transparent",
                    border: "none",
                    borderRadius: 8,
                    font: "inherit",
                    fontSize: 13,
                    fontWeight: isActive ? 700 : 500,
                    color: "var(--ink)",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span>{LANG_LABELS[lng].name}</span>
                  <span style={{ opacity: 0.5, fontSize: 11 }}>{LANG_LABELS[lng].code}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
