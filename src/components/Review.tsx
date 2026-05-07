import { useTranslation } from "react-i18next";

export default function Review() {
  const { t } = useTranslation("review");
  const bullets = t("bullets", { returnObjects: true }) as string[];

  return (
    <section id="review" className="section">
      <div className="wrap">
        <div className="review-grid">
          <div className="review-text reveal in">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="display">{t("title")}</h2>
            <p>{t("lede")}</p>
            <ul style={{ paddingLeft: 0, listStyle: "none", margin: "26px 0 0", color: "var(--ink-2)" }}>
              {bullets.map((b) => (
                <li key={b} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="#F08A2A"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div id="reviewDemo"></div>
        </div>
      </div>
    </section>
  );
}
