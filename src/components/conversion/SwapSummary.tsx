import type { Asset } from "../../types/transaction";
import { formatFeePercent, formatRate } from "../../utils/assets";
import { formatAmount } from "../../utils/format";
import { computeSwap } from "../../utils/swap";

interface SwapSummaryProps {
  from: Asset;
  to: Asset;
  amount: number;
  price: number;
  feeRate: number;
}

function Row({
  label,
  value,
  strong,
  muted,
}: {
  label: string;
  value: React.ReactNode;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <dt className={`text-sm ${muted ? "text-gray-400" : "text-gray-600 dark:text-gray-300"}`}>
        {label}
      </dt>
      <dd
        className={`text-right tabular-nums ${
          strong
            ? "text-lg font-bold text-gray-900 dark:text-white"
            : "text-sm font-medium text-gray-800 dark:text-gray-100"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

/** Detalhamento da operação: cotação, valor bruto, taxa e valor líquido. */
export default function SwapSummary({ from, to, amount, price, feeRate }: SwapSummaryProps) {
  const { gross, fee, net, effectivePrice } = computeSwap(amount, price, feeRate);

  return (
    <dl className="divide-y divide-gray-100 dark:divide-gray-700">
      <Row label="Cotação de mercado" value={`1 ${from} = ${formatRate(price, to)}`} />
      <Row label="Cotação inversa" value={`1 ${to} = ${formatRate(1 / price, from)}`} muted />
      <Row label="Você converte" value={formatAmount(amount, from)} />
      <Row label="Valor bruto" value={formatAmount(gross, to)} />
      <Row
        label={`Taxa da plataforma (${formatFeePercent(feeRate)})`}
        value={<span className="text-red-600 dark:text-red-400">− {formatAmount(fee, to)}</span>}
      />
      <Row label="Você recebe" value={formatAmount(net, to)} strong />
      <Row
        label="Cotação efetiva (com taxa)"
        value={`1 ${from} = ${formatRate(effectivePrice, to)}`}
        muted
      />
    </dl>
  );
}
