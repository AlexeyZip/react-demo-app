import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "@/shared/i18n/locales/en/common.json";
import ukCommon from "@/shared/i18n/locales/uk/common.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      uk: { common: ukCommon },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "uk"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng.startsWith("uk") ? "uk" : "en";
});

document.documentElement.lang = i18n.resolvedLanguage?.startsWith("uk")
  ? "uk"
  : "en";

export default i18n;
