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

export default i18n;
