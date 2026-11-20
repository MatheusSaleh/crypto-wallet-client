import { ASSETS, type Asset } from "../../types/transaction";
import { assetMeta } from "../../utils/assets";
import { formatAmount } from "../../utils/format";
import AssetBadge from "./AssetBadge";

interface AssetAmountBoxProps {
  label: string;
  asset: Asset;
  onAssetChange: (asset: Asset) => void;
  balance: number | undefined;
  value: string;
  onValueChange?: (value: string) => void;
  /** Campo calculado (lado "Você recebe") */
  readOnly?: boolean;
  /** Mostra os atalhos 25% / 50% / MÁX */
  onFraction?: (fraction: number) => void;
  error?: string;
  hint?: React.ReactNode;
}

const FRACTIONS = [
  { label: "25%", value: 0.25 },
  { label: "50%", value: 0.5 },
  { label: "MÁX", value: 1 },
];

export default function AssetAmountBox({
  label,
  asset,
  onAssetChange,
  balance,
  value,
  onValueChange,
  readOnly,
  onFraction,
  error,
  hint,
}: AssetAmountBoxProps) {
  const inputId = `amount-${label.replace(/\s/g, "-").toLowerCase()}`;

  return (
    <div
      className={`p-4 rounded-xl border transition-colors ${
        error
          ? "border-red-400 bg-red-50 dark:bg-red-950/30 dark:border-red-700"
          : readOnly
            ? "border-gray-200 bg-gray-50 dark:bg-gray-900/40 dark:border-gray-700"
            : "border-gray-200 bg-white dark:bg-gray-900/60 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-500"
      }`}
    >
      <div className="flex items-center justify-between mb-2 text-sm">
        <label htmlFor={inputId} className="font-medium text-gray-600 dark:text-gray-300">
          {label}
        </label>
        <span className="text-gray-500 dark:text-gray-400">
          Disponível:{" "}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {balance === undefined ? "—" : formatAmount(balance, asset)}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          value={value}
          readOnly={readOnly}
          onChange={(e) => onValueChange?.(e.target.value)}
          className={`flex-1 min-w-0 text-3xl font-semibold bg-transparent outline-none tabular-nums placeholder:text-gray-300 dark:placeholder:text-gray-600 ${
            readOnly ? "text-gray-700 dark:text-gray-200 cursor-default" : "text-gray-900 dark:text-white"
          }`}
        />

        <div className="relative flex items-center gap-2 py-1.5 pl-1.5 pr-2 bg-gray-100 rounded-full dark:bg-gray-700 shrink-0">
          <AssetBadge asset={asset} size="sm" />
          <select
            value={asset}
            onChange={(e) => onAssetChange(e.target.value as Asset)}
            aria-label={`Moeda: ${label}`}
            className="pr-1 font-semibold text-gray-900 bg-transparent outline-none cursor-pointer dark:text-white"
          >
            {ASSETS.map((a) => (
              <option key={a} value={a} className="text-black">
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-2 min-h-[1.75rem]">
        <span className={`text-sm ${error ? "text-red-600 dark:text-red-400 font-medium" : "text-gray-500 dark:text-gray-400"}`}>
          {error ?? hint ?? assetMeta[asset].name}
        </span>

        {onFraction && (
          <div className="flex gap-1.5">
            {FRACTIONS.map((f) => (
              <button
                key={f.label}
                type="button"
                disabled={!balance}
                onClick={() => onFraction(f.value)}
                className="px-2 py-0.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
