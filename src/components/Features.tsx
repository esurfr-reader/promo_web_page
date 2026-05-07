import { useTranslation } from "react-i18next";

type Item = { title: string; body: string };

const ICONS = [
  <path key="1" d="M3 12h3l3-7 4 14 3-7h5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="2" d="M5 8h14v10H5z M9 8V5h6v3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
  <g key="3">
    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2.2" />
    <path d="M12 7v5l3 2" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </g>,
  <path key="4" d="M4 5h16M4 12h16M4 19h10" stroke="white" strokeWidth="2.2" strokeLinecap="round" />,
  <path key="5" d="M3 19l6-14 4 9 3-5 5 10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="6" d="M4 8c4-5 12-5 16 0M4 14c4-5 12-5 16 0M4 20c4-5 12-5 16 0" stroke="white" strokeWidth="2.2" strokeLinecap="round" />,
];

const TINTS = ["", "alt", "alt2", "", "alt", "alt2"];

export default function Features() {
  const { t } = useTranslation("features");
  const items = t("items", { returnObjects: true }) as Item[];

  return (
    <section id="features" className="features section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="display">{t("title")}</h2>
          <p>{t("lede")}</p>
        </div>

        <div className="features-grid">
          {items.map((item, i) => (
            <div key={i} className={`feature ${TINTS[i] ?? ""} reveal in`}>
              <div className="ficon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  {ICONS[i] ?? null}
                </svg>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
