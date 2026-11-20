import { useLedger } from "../../hooks/useWallet";
import { getErrorMessage } from "../../services/api";
import { formatAmount, isCredit, ledgerTypeLabel } from "../../utils/format";

interface TransactionsTableProps {
  page?: number;
  limit?: number;
  title?: string;
}

/** Tabela de movimentações baseada no ledger (GET /ledger). */
export default function TransactionsTable({
  page = 1,
  limit = 10,
  title = "Últimas movimentações",
}: TransactionsTableProps) {
  const { data: entries, isLoading, error } = useLedger(page, limit);

  return (
    <div className="w-full p-6 bg-white shadow rounded-xl dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
        {title}
      </h3>

      {isLoading && <p className="text-sm text-gray-500">Carregando...</p>}

      {error && (
        <p className="text-sm text-red-500">
          {getErrorMessage(error, "Erro ao carregar movimentações")}
        </p>
      )}

      {entries && entries.length === 0 && (
        <p className="text-sm text-gray-500">Nenhuma movimentação encontrada.</p>
      )}

      {entries && entries.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left border-b dark:border-gray-700">
              <tr className="text-gray-600 dark:text-gray-300">
                <th className="py-2">Data</th>
                <th>Tipo</th>
                <th>Ativo</th>
                <th>Valor</th>
                <th>Saldo após</th>
              </tr>
            </thead>

            <tbody>
              {entries.map((entry, index) => (
                <tr
                  key={`${entry.createdAt}-${entry.type}-${index}`}
                  className="text-gray-700 border-b dark:border-gray-700 dark:text-gray-200"
                >
                  <td className="py-2">
                    {new Date(entry.createdAt).toLocaleString("pt-BR")}
                  </td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        isCredit(entry.type)
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {ledgerTypeLabel[entry.type] ?? entry.type}
                    </span>
                  </td>

                  <td>{entry.token}</td>

                  <td
                    className={`font-semibold ${
                      entry.amount >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatAmount(entry.amount, entry.token)}
                  </td>

                  <td>{formatAmount(entry.newBalance, entry.token)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
