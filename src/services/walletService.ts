import { api } from "./api";
import type {
  Asset,
  Balance,
  LedgerEntry,
  SwapQuote,
  SwapResult,
} from "../types/transaction";

export async function getBalance() {
  const { data } = await api.get<Balance[]>("/wallet/balance");
  return data;
}

export async function getLedger(page = 1, limit = 10) {
  const { data } = await api.get<LedgerEntry[]>("/ledger", {
    params: { page, limit },
  });
  return data;
}

interface DepositInput {
  userId: string;
  token: Asset;
  amount: number;
}

/**
 * O backend expõe o depósito como webhook (simulando um provedor externo),
 * por isso exige userId e uma chave de idempotência.
 */
export async function deposit({ userId, token, amount }: DepositInput) {
  const { data } = await api.post("/webhooks/deposit", {
    userId,
    token,
    amount: String(amount),
    idempotencyKey: crypto.randomUUID(),
  });
  return data;
}

export async function withdraw(token: Asset, amount: number) {
  const { data } = await api.post("/withdraw", { token, amount });
  return data;
}

export async function getSwapQuote(fromToken: Asset, toToken: Asset, amount: number) {
  const { data } = await api.get<SwapQuote>("/swap/quote", {
    params: { fromToken, toToken, amount },
  });
  return data;
}

export async function executeSwap(fromToken: Asset, toToken: Asset, amount: number) {
  const { data } = await api.post<SwapResult>("/swap", { fromToken, toToken, amount });
  return data;
}
