import { useEffect } from "react";
import { ArrowDown, CheckCircle2, X } from "lucide-react";
import type { Asset, SwapResult } from "../../types/transaction";
import { formatAmount } from "../../utils/format";
import AssetBadge from "./AssetBadge";
import SwapSummary from "./SwapSummary";
import BalanceImpact, { type BalanceChange } from "./BalanceImpact";
import { computeSwap } from "../../utils/swap";

interface ConfirmSwapModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
  /** Preenchido após a execução: mostra o comprovante */
  result: SwapResult | null;
  from: Asset;
  to: Asset;
  amount: number;
  price: number;
  feeRate: number;
  changes: BalanceChange[];
}

export default function ConfirmSwapModal({
  open,
  onClose,
  onConfirm,
  isPending,
  result,
  from,
  to,
  amount,
  price,
  feeRate,
  changes,
}: ConfirmSwapModalProps) {
  // Fecha com Esc (exceto durante a execução)
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !isPending) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, isPending, onClose]);

  if (!open) return null;

  const { net } = computeSwap(amount, price, feeRate);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => !isPending && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="swap-modal-title"
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white shadow-2xl rounded-2xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 id="swap-modal-title" className="text-lg font-bold dark:text-white">
            {result ? "Conversão concluída" : "Revise sua conversão"}
          </h2>
          <button
            onClick={onClose}
            disabled={isPending}
            aria-label="Fechar"
            className="p-1 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
          >
            <X size={20} />
          </button>
        </div>

        {result ? (
          // Comprovante
          <div className="px-6 py-6 space-y-5 text-center">
            <CheckCircle2 size={56} className="mx-auto text-green-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Você converteu</p>
              <p className="text-xl font-semibold dark:text-white">
                {formatAmount(result.amount, result.fromToken)}
              </p>
              <ArrowDown size={18} className="mx-auto my-1 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">e recebeu</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatAmount(result.received, result.toToken)}
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Taxa cobrada: {formatAmount(result.fee, result.toToken)}
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700"
            >
              Concluir
            </button>
          </div>
        ) : (
          // Revisão
          <div className="px-6 py-5 space-y-5">
            <div className="p-4 space-y-2 rounded-xl bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Você paga</span>
                <span className="flex items-center gap-2 text-lg font-semibold dark:text-white">
                  <AssetBadge asset={from} size="sm" />
                  {formatAmount(amount, from)}
                </span>
              </div>
              <div className="flex justify-center">
                <ArrowDown size={18} className="text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Você recebe (estimado)</span>
                <span className="flex items-center gap-2 text-lg font-bold text-green-600 dark:text-green-400">
                  <AssetBadge asset={to} size="sm" />
                  {formatAmount(net, to)}
                </span>
              </div>
            </div>

            <SwapSummary from={from} to={to} amount={amount} price={price} feeRate={feeRate} />

            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                Impacto no seu saldo
              </h3>
              <BalanceImpact changes={changes} />
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              A cotação é reconsultada no momento da execução, então o valor recebido
              pode variar levemente em relação ao estimado.
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isPending}
                className="flex-1 py-3 font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 disabled:opacity-50"
              >
                Voltar
              </button>
              <button
                onClick={onConfirm}
                disabled={isPending}
                className="flex-[2] py-3 font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 disabled:opacity-60"
              >
                {isPending ? "Convertendo..." : "Confirmar conversão"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
