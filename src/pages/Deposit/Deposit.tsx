import BalancesTable from "../../components/deposit/BalancesTable";
import DepositForm from "../../components/deposit/DepositForm";
import { useApp } from "../../context/AppContext";

export default function Deposit() {
  const { users } = useApp();

  return (
    <div className="space-y-6">
      <h1 className="text-2x1 font-bold text-gray-800 dark:text-white">
        Depósitos
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <DepositForm />
        <BalancesTable users={users} />
      </div>
    </div>
  );
}
