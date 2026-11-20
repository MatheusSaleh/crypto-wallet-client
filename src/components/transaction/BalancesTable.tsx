import { useBalance } from "../../hooks/useWallet";
import { getErrorMessage } from "../../services/api";
import { formatAmount } from "../../utils/format";

export default function BalancesTable() {
  const { data: balances, isLoading, error } = useBalance();

  return (
    <div className="p-6 bg-white shadow rounded-xl dark:bg-gray-800">
      <h2 className="mb-4 font-semibold dark:text-white">Meus saldos</h2>

      {isLoading && <p className="text-sm text-gray-500">Carregando...</p>}

      {error && (
        <p className="text-sm text-red-500">
          {getErrorMessage(error, "Erro ao carregar saldos")}
        </p>
      )}

      <div className="space-y-3">
        {balances?.map((b) => (
          <div
            key={b.token}
            className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <span className="dark:text-white">{b.token}</span>
            <span className="font-medium dark:text-white">
              {formatAmount(b.balance, b.token)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
