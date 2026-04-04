import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      className="rounded border px-2 py-1 text-sm"
      value={i18n.resolvedLanguage?.startsWith("uk") ? "uk" : "en"}
      onChange={(e) => void i18n.changeLanguage(e.target.value)}
      aria-label="Language switcher"
    >
      <option value="en">EN</option>
      <option value="uk">UK</option>
    </select>
  );
}
