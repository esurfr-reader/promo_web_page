import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "./i18n/i18n";
import "./styles/index.css";
import App from "./App";

const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng.split("-")[0];
};
syncHtmlLang(i18n.resolvedLanguage ?? i18n.language ?? "en");
i18n.on("languageChanged", syncHtmlLang);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
