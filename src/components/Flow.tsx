import { useTranslation } from "react-i18next";

type Step = { step: string; title: string; body: string };

export default function Flow() {
  const { t } = useTranslation("flow");
  const steps = t("steps", { returnObjects: true }) as Step[];

  return (
    <section id="how" className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="display">{t("title")}</h2>
          <p>{t("lede")}</p>
        </div>

        <div className="flow-grid">
          {steps.map((s, i) => (
            <div key={i} className="flow-card reveal in">
              <div className="card-vis" id={`flowVis${i + 1}`}></div>
              <div className="card-body">
                <span className="step">
                  <span className="stepnum">{i + 1}</span> {s.step}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
