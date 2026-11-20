import { ArrowRight } from "lucide-react";
import type { Asset } from "../../types/transaction";
import { formatAmount } from "../../utils/format";
import AssetBadge from "./AssetBadge";

export interface BalanceChange {
  asset: Asset;
  before: number;
  after: number;
}

/** Mostra saldo atual → saldo após a conversão para cada moeda envolvida. */
export default function BalanceImpact({ changes }: { changes: BalanceChange[] }) {
  return (
    <div className="space-y-3">
      {changes.map(({ asset, before, after }) => {
        const delta = after - before;
        const negative = after < 0;

        return (
          <div
            key={asset}
            className="p-3 border border-gray-200 rounded-lg dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 font-semibold dark:text-white">
                <AssetBadge asset={asset} size="sm" />
                {asset}
              </span>
              <span
                className={`text-sm font-semibold tabular-nums ${
                  delta > 0
                    ? "text-green-600 dark:text-green-400"
                    : delta < 0
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-500"
                }`}
              >
                {delta > 0 ? "+" : delta < 0 ? "−" : ""}
                {formatAmount(Math.abs(delta), asset)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 text-sm tabular-nums">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Saldo atual</p>
                <p className="text-gray-700 dark:text-gray-200">{formatAmount(before, asset)}</p>
              </div>
              <ArrowRight size={16} className="text-gray-400 shrink-0" />
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">Saldo após</p>
                <p
                  className={`font-semibold ${
                    negative ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"
                  }`}
                >
                  {formatAmount(after, asset)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
