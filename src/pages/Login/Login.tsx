import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    navigate("/dashboard/home");
  }

  return (
    <div className="flex items-center justify-center min-h-screen transition-colors bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">

      <button
        onClick={toggleTheme}
        className="absolute px-4 py-2 bg-white rounded-lg shadow top-6 right-6 dark:bg-gray-700"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-10 bg-white border border-gray-200 shadow-xl dark:bg-gray-900 rounded-2xl dark:border-gray-700"
      >

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Crypto Wallet
          </h1>

          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-center text-red-500">{error}</div>
        )}


        <div className="mb-4">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Email
          </label>

          <input
            name="email"
            type="email"
            placeholder="email@email.com"
            className="w-full p-3 mt-1 text-gray-800 border border-gray-300 rounded-lg outline-none dark:border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div className="mb-6">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Senha
          </label>

          <input
            name="password"
            type="password"
            placeholder="********"
            className="w-full p-3 mt-1 text-gray-800 border border-gray-300 rounded-lg outline-none dark:border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <button
          type="submit"
          className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Entrar
        </button>

        <p className="mt-6 text-xs text-center text-gray-400">
          Fintech Admin Panel
        </p>
      </form>
    </div>
  );
}
