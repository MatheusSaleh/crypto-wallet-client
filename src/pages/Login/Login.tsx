import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, login, register } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard/home" replace />;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    if (mode === "register" && password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      if (mode === "login") {
        await login({ email, password });
      } else {
        await register({ email, password });
      }
      navigate("/dashboard/home", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, mode === "login" ? "Erro ao entrar" : "Erro ao cadastrar"));
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full p-3 mt-1 text-gray-800 border border-gray-300 rounded-lg outline-none dark:border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500";

  return (
    <div className="flex items-center justify-center min-h-screen transition-colors bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">
      <button
        onClick={toggleTheme}
        className="absolute px-4 py-2 text-black bg-white rounded-lg shadow top-6 right-6 dark:bg-gray-700 dark:text-white"
      >
        {theme === "light" ? "🌙 Tema Escuro" : "☀️ Tema Claro"}
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-10 bg-white border border-gray-200 shadow-xl dark:bg-gray-900 rounded-2xl dark:border-gray-700"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Crypto Wallet
          </h1>
          <p className="text-sm text-gray-500">
            {mode === "login" ? "Acesse sua carteira" : "Crie sua conta"}
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-center text-red-500">{error}</div>
        )}

        <div className="mb-4">
          <label className="text-sm text-gray-600 dark:text-gray-300">Email</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="email@email.com"
            className={inputClass}
          />
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-600 dark:text-gray-300">Senha</label>
          <input
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            placeholder="********"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Cadastrar"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
          className="w-full mt-4 text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          {mode === "login"
            ? "Não tem conta? Cadastre-se"
            : "Já tem conta? Entrar"}
        </button>
      </form>
    </div>
  );
}
