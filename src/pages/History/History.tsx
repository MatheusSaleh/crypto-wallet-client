import { useState } from "react";
import TransactionsTable from "../../components/transaction/TransactionsTable";
import { useLedger } from "../../hooks/useWallet";

const ITEMS_PER_PAGE = 10;

export default function History() {
  const [page, setPage] = useState(1);
  const { data: entries, isFetching } = useLedger(page, ITEMS_PER_PAGE);

  // O backend não retorna o total; se a página veio cheia, pode haver próxima
  const hasNext = (entries?.length ?? 0) === ITEMS_PER_PAGE;

  const buttonClass =
    "px-3 py-1 transition-colors border rounded dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Extrato</h1>

      <TransactionsTable page={page} limit={ITEMS_PER_PAGE} title="Movimentações" />

      <div className="flex items-center justify-end gap-3">
        <button
          disabled={page === 1 || isFetching}
          onClick={() => setPage(page - 1)}
          className={buttonClass}
        >
          Anterior
        </button>

        <span className="px-3 py-1 dark:text-white">Página {page}</span>

        <button
          disabled={!hasNext || isFetching}
          onClick={() => setPage(page + 1)}
          className={buttonClass}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
