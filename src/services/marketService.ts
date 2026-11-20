import { api } from "./api";
import type { TickerItem } from "../types/transaction";

export async function getTicker() {
  const { data } = await api.get<TickerItem[]>("/market/ticker");
  return data;
}
