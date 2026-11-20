/** Tokens suportados pelo crypto-wallet-server */
export const ASSETS = ["BRL", "BTC", "ETH"] as const;

export type Asset = (typeof ASSETS)[number];

/** GET /wallet/balance */
export interface Balance {
  token: Asset;
  balance: number;
}

export type LedgerType =
  | "DEPOSIT"
  | "WITHDRAWAL"
  | "SWAP_IN"
  | "SWAP_OUT"
  | "SWAP_FEE";

/** GET /ledger */
export interface LedgerEntry {
  type: LedgerType;
  token: Asset;
  amount: number;
  previousBalance: number;
  newBalance: number;
  createdAt: string;
}

/** GET /swap/quote */
export interface SwapQuote {
  price: number;
  amount: number;
  fee: number;
}

/** POST /swap */
export interface SwapResult {
  fromToken: Asset;
  toToken: Asset;
  amount: number;
  received: number;
  fee: number;
}

/** GET /market/ticker */
export interface TickerItem {
  symbol: string;
  name: string;
  type: "crypto" | "fiat";
  priceBrl: number;
  change24h: number | null;
}
