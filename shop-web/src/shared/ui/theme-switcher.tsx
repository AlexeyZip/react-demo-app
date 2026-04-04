import { useEffect, useState } from "react";
import {
  applyTheme,
  getStoredTheme,
  setStoredTheme,
  type ThemeMode,
} from "@/shared/theme/theme";

export function ThemeSwitcher() {
  const [mode, setMode] = useState<ThemeMode>(() => getStoredTheme());

  useEffect(() => {
    applyTheme(mode);
    setStoredTheme(mode);
  }, [mode]);

  useEffect(() => {
    if (mode !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, [mode]);

  return (
    <select
      className="rounded border px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
      value={mode}
      onChange={(e) => setMode(e.target.value as ThemeMode)}
      aria-label="Theme switcher"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
