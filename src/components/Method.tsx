import { useTranslation } from "react-i18next";

type Author = { initials: string; name: string; role: string };
type Stat = { value: string; label: string };

export default function Method() {
  const { t } = useTranslation("method");
  const author = t("author", { returnObjects: true }) as Author;
  const stats = t("stats", { returnObjects: true }) as Stat[];

  return (
    <section id="method" className="method section">
      <div className="wrap method-inner">
        <div className="reveal in">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="display" style={{ margin: "14px 0 10px" }}>
            {t("title")}
          </h2>
          <blockquote>{t("quote")}</blockquote>
          <div className="author">
            <div className="avatar">{author.initials}</div>
            <div className="author-meta">
              <b>{author.name}</b>
              <span>{author.role}</span>
            </div>
          </div>
        </div>

        <div className="stat-grid reveal in">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <div className="num">
                <span>{s.value}</span>
              </div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
