import { useTranslation } from "react-i18next";
import { images } from "../content/images";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer>
      <div className="wrap foot-inner">
        <div className="foot-brand">
          <img src={images.brandLogo} alt="" />
          {t("brand")}
        </div>
        <div>
          {t("footer.copyright")} ·{" "}
          <a href="https://www.esurfr.com/" target="_blank" rel="noopener noreferrer">
            {t("footer.links.esurfr")}
          </a>{" "}
          · <a href="#">{t("footer.links.privacy")}</a> ·{" "}
          <a href="#">{t("footer.links.support")}</a>
        </div>
      </div>
    </footer>
  );
}
