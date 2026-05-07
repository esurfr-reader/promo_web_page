import { useTranslation } from "react-i18next";
import { SUPPORTED_LNGS, type Lng } from "../i18n/i18n";

type Item = { name: string; code: string };

export default function Languages() {
  const { t, i18n } = useTranslation("common");
  const items = t("languages.items", { returnObjects: true }) as Item[];
  const current = (i18n.resolvedLanguage ?? i18n.language ?? "en").split("-")[0] as Lng;

  return (
    <section className="langs">
      <div className="wrap">
        <span className="eyebrow" style={{ display: "inline-flex" }}>
          {t("languages.title")}
        </span>
        <div className="row">
          {items.map((it, i) => {
            const lng = SUPPORTED_LNGS[i];
            const isActive = current === lng;
            return (
              <button
                key={it.code}
                type="button"
                className="lang-chip"
                onClick={() => i18n.changeLanguage(lng)}
                aria-pressed={isActive}
                style={{
                  cursor: "pointer",
                  border: isActive ? "1px solid var(--navy)" : undefined,
                  background: isActive ? "var(--paper-2)" : undefined,
                  font: "inherit",
                }}
              >
                {it.name}
                <span className="sub">{it.code}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
