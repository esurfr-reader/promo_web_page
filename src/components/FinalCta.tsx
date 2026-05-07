import { useTranslation } from "react-i18next";

export default function FinalCta() {
  const { t } = useTranslation("cta");

  return (
    <section id="download" className="final-cta">
      <div className="wrap-narrow" style={{ position: "relative", zIndex: 2 }}>
        <h2 dangerouslySetInnerHTML={{ __html: t("title") }} />
        <p>{t("lede")}</p>
        <div className="actions">
          <a href="#" className="store-btn" aria-label={t("stores.appStoreBig")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.4 12.3c0-2.7 2.2-4 2.3-4-1.3-1.8-3.2-2.1-3.9-2.1-1.7-.2-3.2 1-4 1-.9 0-2.1-1-3.5-1-1.8 0-3.4 1-4.3 2.6-1.9 3.2-.5 8 1.3 10.6.9 1.3 2 2.7 3.4 2.7 1.4-.1 1.9-.9 3.5-.9s2 .9 3.5.8c1.4 0 2.4-1.3 3.3-2.6 1-1.5 1.4-2.9 1.4-3 0-.1-2.7-.7-2.7-2.1zM13.6 4.5c.7-.9 1.3-2.1 1.1-3.3-1.1.1-2.4.7-3.1 1.6-.7.8-1.3 2.1-1.1 3.2 1.2.1 2.4-.6 3.1-1.5z" />
            </svg>
            <span>
              <span className="small">{t("stores.appStoreSmall")}</span>
              <span className="big">{t("stores.appStoreBig")}</span>
            </span>
          </a>
          <a href="#" className="store-btn" aria-label={t("stores.playStoreBig")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.6 2.3c-.4.4-.6 1.1-.6 1.9v15.6c0 .9.2 1.5.6 1.9l.1.1L13 12l-9.4-9.7zM17 15.4l-3.4-3.4 3.4-3.4 3.7 2.1c1.1.6 1.1 1.6 0 2.2L17 15.4zM4 22c.3.3.7.4 1.2.4.3 0 .7-.1 1-.3l11-6.3-3.6-3.6L4 22zM5.2 1.6c-.5 0-.9.1-1.2.3l9.6 9.5L17.2 8 6.2 1.9c-.4-.2-.7-.3-1-.3z" />
            </svg>
            <span>
              <span className="small">{t("stores.playStoreSmall")}</span>
              <span className="big">{t("stores.playStoreBig")}</span>
            </span>
          </a>
        </div>
        <p style={{ marginTop: 38, fontSize: 13.5, color: "rgba(255,255,255,.55)" }}>
          {t("footnote")}
        </p>
      </div>
    </section>
  );
}
