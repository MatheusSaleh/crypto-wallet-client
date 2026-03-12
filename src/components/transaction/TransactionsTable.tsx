import { useApp } from "../../context/AppContext";

export default function TransactionsTable() {
  const { transactions, users } = useApp();

  const lastTransactions = [...transactions]
    .sort(
      (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
    )
    .slice(0, 10);

  function getUserName(userId: string) {
    return users.find((u) => u.id === userId)?.name ?? "Usuário desconhecido";
  }

  return (
    <div className="p-6 bg-white shadow rounded-xl dark:bg-gray-800 w-full">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
        Últimas movimentações
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left border-b dark:border-gray-700">
            <tr className="text-gray-600 dark:text-gray-300">
              <th className="py-2">Data</th>
              <th>Usuário</th>
              <th>Tipo</th>
              <th>Ativo</th>
              <th>Valor</th>
            </tr>
          </thead>

          <tbody>
            {lastTransactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b dark:border-gray-700 text-gray-700 dark:text-gray-200"
              >
                <td className="py-2">
                  {new Date(tx.createdAt).toLocaleString()}
                </td>

                <td className="py-2">{getUserName(tx.userId)}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold 
                                            ${
                                              tx.type === "DEPOSIT"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }
                                            `}
                  >
                    {tx.type === "DEPOSIT" ? "DEPÓSITO" : "SAQUE"}
                  </span>
                </td>

                <td>{tx.asset}</td>

                <td className="font-semibold">
                    {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
