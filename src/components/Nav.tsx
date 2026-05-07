import { useTranslation } from "react-i18next";
import { images } from "../content/images";

export default function Nav() {
  const { t } = useTranslation("common");
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-brand" href="#top">
          <img src={images.brandLogo} alt={t("brand")} />
          <span className="wordmark">{t("brand")}</span>
        </a>
        <div className="nav-links">
          <a href="#how">{t("nav.how")}</a>
          <a href="#canvas">{t("nav.canvas")}</a>
          <a href="#review">{t("nav.review")}</a>
          <a href="#method">{t("nav.method")}</a>
          <a className="keep" href="#download">
            <button className="nav-cta">{t("nav.cta")}</button>
          </a>
        </div>
      </div>
    </nav>
  );
}
