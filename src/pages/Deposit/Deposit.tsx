import BalancesTable from "../../components/transaction/BalancesTable";
import TransactionForm from "../../components/transaction/TransactionForm";
import TransactionsTable from "../../components/transaction/TransactionsTable";
import { useApp } from "../../context/AppContext";

export default function Deposit() {
  const { users } = useApp();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Depósitos
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <TransactionForm type="DEPOSIT"/>
        <BalancesTable users={users} />
      </div>

      <TransactionsTable/>
    </div>
  );
}
