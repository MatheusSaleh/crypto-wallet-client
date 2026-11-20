import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../context/AuthContext";
import { useBalance } from "../../hooks/useWallet";
import { ASSETS } from "../../types/transaction";
import { formatAmount } from "../../utils/format";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { data: balances, isLoading } = useBalance();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <header className="flex items-center justify-between h-16 gap-3 px-6 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-2 overflow-x-auto">
        {isLoading &&
          ASSETS.map((asset) => (
            <div
              key={asset}
              className="w-28 h-8 bg-gray-100 rounded-lg animate-pulse dark:bg-gray-700"
            />
          ))}

        {balances?.map((b) => (
          <div
            key={b.token}
            title={`Saldo em ${b.token}`}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 whitespace-nowrap"
          >
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {b.token}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatAmount(b.balance, b.token)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {user && (
          <span className="hidden text-sm text-gray-600 md:inline dark:text-gray-300">
            {user.email}
          </span>
        )}

        <button
          onClick={toggleTheme}
          className="px-4 py-2 font-medium text-gray-900 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          {theme === "light" ? "🌙 Tema Escuro" : "☀️ Tema Claro"}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 font-medium text-red-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </header>
  );
}
