import { useTranslation } from "react-i18next";
import { SUPPORTED_LNGS, type Lng } from "../i18n/i18n";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation("common");
  const current = (i18n.resolvedLanguage ?? i18n.language ?? "en").split("-")[0] as Lng;

  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        fontWeight: 600,
        color: "var(--ink-2)",
      }}
    >
      <span style={{ opacity: 0.7 }}>{t("languageSwitcher.label")}</span>
      <select
        value={current}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label={t("languageSwitcher.label")}
        style={{
          padding: "6px 10px",
          borderRadius: 8,
          border: "1px solid rgba(10,31,58,.18)",
          background: "#fff",
          font: "inherit",
          cursor: "pointer",
        }}
      >
        {SUPPORTED_LNGS.map((lng) => (
          <option key={lng} value={lng}>
            {t(`languageSwitcher.${lng}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
