import type { User } from "../../types/user";

type BalancesTableProps = {
  users: User[];
};

export default function BalancesTable({ users }: BalancesTableProps) {
  return (
    <div className="p-6 bg-white shadow rounded-xl dark:bg-gray-800">
      <h2 className="mb-4 font-semibold dark:text-white">Saldo por usuário</h2>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

            <thead className="border-b dark:border-gray-700">

                <tr className="text-left">

                    <th className="p-2 dark:text-white">Usuário</th>
                    <th className="p-2 dark:text-white">BRL</th>
                    <th className="p-2 dark:text-white">BTC</th>
                    <th className="p-2 dark:text-white">ETH</th>
                    <th className="p-2 dark:text-white">USDT</th>
                </tr>
            </thead>

            <tbody>

                {users.map((user) => (

                    <tr
                        key={user.id}
                        className="border-b dark:border-gray-700"
                    >

                        <td className="p-2 dark:text-white">
                            {user.name}
                        </td>

                        <td className="p-2 dark:text-white">
                            {user.balances.BRL}
                        </td>

                        <td className="p-2 dark:text-white">
                            {user.balances.BTC}
                        </td>

                        <td className="p-2 dark:text-white">
                            {user.balances.ETH}
                        </td>

                        <td className="p-2 dark:text-white">
                            {user.balances.USDT}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
