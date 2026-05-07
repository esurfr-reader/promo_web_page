import { useTranslation } from "react-i18next";
import { images } from "../content/images";

export default function Hero() {
  const { t } = useTranslation("hero");
  const meta = t("meta", { returnObjects: true }) as {
    languages: string;
    breakTypes: string;
    platforms: string;
  };
  const logoStrip = t("logoStrip", { returnObjects: true }) as {
    label: string;
    items: string[];
  };

  return (
    <section id="top" className="hero">
      <div className="hero-sun"></div>
      <svg className="hero-wave-bg" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0,160 C240,40 480,200 720,140 C960,80 1200,180 1440,100 L1440,220 L0,220 Z"
          fill="url(#g1)"
        />
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#6dd5ed" />
            <stop offset="100%" stopColor="#2193b0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="wrap hero-grid" style={{ position: "relative", zIndex: 2 }}>
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="display">
            {t("title.line1Prefix")}
            <span className="swell">{t("title.line1Highlight")}</span>
            {t("title.line1Suffix")}
            <br />
            {t("title.line2")}
            <br />
            {t("title.line3")}
          </h1>
          <p className="lede">{t("lede")}</p>
          <div className="hero-actions">
            <a href="#download" className="btn btn-primary">
              {t("primaryCta")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#how" className="btn btn-ghost">
              {t("secondaryCta")}
            </a>
          </div>
          <div className="hero-meta">
            <div dangerouslySetInnerHTML={{ __html: meta.languages }} />
            <span className="dot"></span>
            <div dangerouslySetInnerHTML={{ __html: meta.breakTypes }} />
            <span className="dot"></span>
            <div>{meta.platforms}</div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="phone">
            <div className="phone-screen">
              <img
                src={images.heroPhoneScreenshot}
                alt={t("phoneAlt")}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="wrap"
        style={{ position: "relative", zIndex: 2, marginTop: 96, paddingBottom: 40 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
            flexWrap: "wrap",
            opacity: 0.7,
          }}
        >
          <span
            style={{
              fontSize: 12,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "var(--ink-2)",
              fontWeight: 700,
            }}
          >
            {logoStrip.label}
          </span>
          {logoStrip.items.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "var(--display)",
                fontSize: 18,
                fontWeight: 600,
                color: "var(--navy)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
