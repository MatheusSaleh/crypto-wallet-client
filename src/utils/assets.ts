import type { Asset } from "../types/transaction";

interface AssetMeta {
  name: string;
  /** Casas decimais usadas para exibir/digitar valores */
  decimals: number;
  /** Classes do "ícone" circular do ativo */
  badgeClass: string;
  symbolChar: string;
}

export const assetMeta: Record<Asset, AssetMeta> = {
  BRL: {
    name: "Real brasileiro",
    decimals: 2,
    badgeClass: "bg-emerald-500 text-white",
    symbolChar: "R$",
  },
  BTC: {
    name: "Bitcoin",
    decimals: 8,
    badgeClass: "bg-orange-500 text-white",
    symbolChar: "₿",
  },
  ETH: {
    name: "Ethereum",
    decimals: 8,
    badgeClass: "bg-indigo-500 text-white",
    symbolChar: "Ξ",
  },
};

/** Converte texto digitado (aceita vírgula ou ponto) em número. */
export function parseAmountInput(value: string): number {
  const normalized = value.replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : NaN;
}

/** Formata um número para preencher o input (sem separador de milhar). */
export function toAmountInput(value: number, asset: Asset): string {
  // Arredonda para baixo para nunca ultrapassar o saldo disponível
  const factor = 10 ** assetMeta[asset].decimals;
  const floored = Math.floor(value * factor) / factor;
  return floored.toFixed(assetMeta[asset].decimals).replace(/\.?0+$/, "").replace(".", ",");
}

/**
 * Formata uma cotação. Em BRL usa formato de moeda (R$ 368.464,00) para não
 * confundir separador de milhar com decimal; nas criptos adapta as casas à magnitude.
 */
export function formatRate(value: number, asset?: Asset): string {
  if (asset === "BRL") {
    const digits = value >= 1 ? 2 : value >= 0.01 ? 4 : 8;
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }
  const digits = value >= 1000 ? 2 : value >= 1 ? 4 : 8;
  const formatted = value.toLocaleString("pt-BR", { maximumFractionDigits: digits });
  return asset ? `${formatted} ${asset}` : formatted;
}

/** Percentual da taxa formatado (0.015 → "1,5%"). */
export function formatFeePercent(feeRate: number): string {
  return `${(Math.round(feeRate * 10000) / 100).toLocaleString("pt-BR")}%`;
}
