import { useTranslation } from "react-i18next";
import { breakOrder, images } from "../content/images";

export default function Canvas() {
  const { t } = useTranslation("canvas");
  const labels = t("breakLabels", { returnObjects: true }) as string[];

  return (
    <section id="canvas" className="canvas-section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="display">{t("title")}</h2>
          <p>{t("lede")}</p>
        </div>

        <div id="canvasDemo"></div>

        <div className="break-row" style={{ marginTop: 60 }}>
          {breakOrder.map((key, i) => (
            <div key={key} className="break">
              <img src={images.breaks[key]} alt={labels[i] ?? key} />
              <div className="label">{labels[i] ?? key}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
