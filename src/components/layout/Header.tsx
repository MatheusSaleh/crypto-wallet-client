import { useTheme } from "../../hooks/useTheme";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-end h-16 px-6 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 font-medium text-gray-900 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        {theme === "light" ? "🌙 Tema Escuro" : "☀️ Tema Claro"}
      </button>
    </header>
  );
}
