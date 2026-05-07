import { useTranslation } from "react-i18next";

type Card = { num: string; title: string; body: string };

export default function Problem() {
  const { t } = useTranslation("problem");
  const cards = t("cards", { returnObjects: true }) as Card[];

  return (
    <section className="problem section" id="why">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="display">{t("title")}</h2>
          <p>{t("lede")}</p>
        </div>

        <div className="problem-grid">
          {cards.map((c) => (
            <div key={c.num} className="problem-card reveal in">
              <div className="num">{c.num}</div>
              <h3>{c.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: c.body }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
