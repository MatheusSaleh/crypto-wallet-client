import type { Asset, LedgerType } from "../types/transaction";

export function formatAmount(value: number, asset: Asset) {
  if (asset === "BRL") {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 8 })} ${asset}`;
}

export const ledgerTypeLabel: Record<LedgerType, string> = {
  DEPOSIT: "Depósito",
  WITHDRAWAL: "Saque",
  SWAP_IN: "Conversão (entrada)",
  SWAP_OUT: "Conversão (saída)",
  SWAP_FEE: "Taxa de conversão",
};

export function isCredit(type: LedgerType) {
  return type === "DEPOSIT" || type === "SWAP_IN";
}
