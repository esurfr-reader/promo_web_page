import { useTranslation } from "react-i18next";

type Item = { name: string; code: string };

export default function Languages() {
  const { t } = useTranslation("common");
  const items = t("languages.items", { returnObjects: true }) as Item[];

  return (
    <section className="langs">
      <div className="wrap">
        <span className="eyebrow" style={{ display: "inline-flex" }}>
          {t("languages.title")}
        </span>
        <div className="row">
          {items.map((it) => (
            <div key={it.code} className="lang-chip">
              {it.name}
              <span className="sub">{it.code}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
