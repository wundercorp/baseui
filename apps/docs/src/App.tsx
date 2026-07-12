import { useEffect, useState } from "react";
import { BaseUIShowcase } from "./components/BaseUIShowcase.js";

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = window.localStorage.getItem("baseui-theme");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("baseui-theme", theme);
  }, [theme]);

  return <BaseUIShowcase theme={theme} onThemeChange={() => setTheme((value) => value === "dark" ? "light" : "dark")} />;
}
