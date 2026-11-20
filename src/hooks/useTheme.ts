import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  // Lê o tema salvo na inicialização, sem setState dentro de efeito
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem("theme") === "dark" ? "dark" : "light",
  );

  // Sincroniza o DOM e o localStorage com o estado
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  return { theme, toggleTheme };
}
