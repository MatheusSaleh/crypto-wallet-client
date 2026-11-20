import BalancesTable from "../../components/transaction/BalancesTable";
import TransactionsTable from "../../components/transaction/TransactionsTable";
import { useBalance, useLedger } from "../../hooks/useWallet";
import { formatAmount } from "../../utils/format";

export default function Home() {
  const { data: balances } = useBalance();
  // Resumo calculado a partir das movimentações mais recentes
  const { data: recent } = useLedger(1, 50);

  const brl = balances?.find((b) => b.token === "BRL")?.balance ?? 0;
  const deposits = recent?.filter((e) => e.type === "DEPOSIT").length ?? 0;
  const withdrawals = recent?.filter((e) => e.type === "WITHDRAWAL").length ?? 0;
  const swaps = recent?.filter((e) => e.type === "SWAP_OUT").length ?? 0;

  const cards = [
    { label: "Saldo BRL", value: formatAmount(brl, "BRL") },
    { label: "Depósitos recentes", value: deposits },
    { label: "Saques recentes", value: withdrawals },
    { label: "Conversões recentes", value: swaps },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="p-4 bg-white shadow dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500">{card.label}</p>
            <h2 className="text-xl font-bold dark:text-white">{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TransactionsTable limit={6} />
        </div>
        <BalancesTable />
      </div>
    </div>
  );
}
