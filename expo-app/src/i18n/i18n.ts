import { Platform } from "react-native";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "./resources";

export const SUPPORTED_LNGS = ["en", "es", "pt", "ja", "fr"] as const;
export type Lng = (typeof SUPPORTED_LNGS)[number];

export const NAMESPACES = [
  "common",
  "hero",
  "problem",
  "flow",
  "canvas",
  "features",
  "review",
  "method",
  "cta",
] as const;

const baseInit = {
  resources,
  fallbackLng: "en",
  supportedLngs: SUPPORTED_LNGS as unknown as string[],
  defaultNS: "common",
  ns: NAMESPACES as unknown as string[],
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
};

if (Platform.OS === "web" && LanguageDetector) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...baseInit,
      detection: {
        order: ["querystring", "localStorage", "navigator", "htmlTag"],
        lookupQuerystring: "lng",
        lookupLocalStorage: "i18nextLng",
        caches: ["localStorage"],
      },
    });
} else {
  i18n.use(initReactI18next).init(baseInit);
}

export default i18n;
