import { transactions } from "../../mocks/transactions";
import { users } from "../../mocks/users";

export default function Home() {
  const activeUsers = users.filter((user) => user.status === "ACTIVE").length;

  const totalDeposits = transactions
    .filter((transaction) => transaction.type === "DEPOSIT")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalWithdraw = transactions
    .filter((transaction) => transaction.type === "WITHDRAW")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balances = [
    { asset: "BRL", amount: "R$ 15.200" },
    { asset: "BTC", amount: "0.35 BTC" },
    { asset: "ETH", amount: "5.2 ETH" },
    { asset: "USDT", amount: "1,200 USDT" },
  ];

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        <div className="p-4 bg-white shadow dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500">Depósitos</p>
            <h2 className="text-xl font-bold dark:text-white">
                {totalDeposits}
            </h2>
        </div>

        <div className="p-4 bg-white shadow dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500">Saques</p>
            <h2 className="text-xl font-bold dark:text-white">
            {totalWithdraw}
            </h2>
        </div>

        <div className="p-4 bg-white shadow dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500">Usuários Ativos</p>
            <h2 className="text-xl font-bold dark:text-white">
                {activeUsers}
            </h2>
        </div>

        <div className="p-4 bg-white shadow dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500">Volume BRL</p>
            <h2 className="text-xl font-bold dark:text-white">
                R$ 20.000
            </h2>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        
        <div className="p-6 bg-white shadow lg:col-span-2 dark:bg-gray-800 rounded-xl">

            <h3 className="mb-3 text-lg font-bold dark:text-white">Últimas movimentações</h3>

            <table className="w-full pt-2 text-sm">
                
                <thead>
                    <tr className="text-left text-gray-500">
                        <th>Usuário</th>
                        <th>Tipo</th>
                        <th>Ativo</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                
                <tbody>
                    {transactions.slice(0,6).map(t => (

                        <tr
                            key={t.id}
                            className="border-t border-gray-200 dark:border-gray-700"
                        >
                            <td className="py-2 dark:text-white">
                                {t.user}
                            </td>

                            <td className={
                                t.type === "DEPOSIT" ? "text-green-500" : "text-red-500"
                            }>
                                {t.type === "DEPOSIT" ? "Depósito" : "Saque"}
                            </td>

                            <td className="dark:text-white">{t.asset}</td>

                            <td className="dark:text-white">{t.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="p-6 bg-white shadow dark:bg-gray-800 rounded-xl">
            
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
                Saldos por Ativo
            </h3>

            <div className="space-y-3">
                
                {balances.map(b => (
                    
                    <div
                        key={b.asset}
                        className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                    >
                        
                        <span className="dark:text-white">
                            {b.asset}
                        </span>

                        <span className="font-medium dark:text-white">
                            {b.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
