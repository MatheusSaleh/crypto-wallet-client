import axios from "axios";
import { api } from "./api";
import { assetToCoinGeckoId } from "../utils/assetToCoinGeckoId";

export async function convertAsset(
  from: string,
  to: string,
  amount: number
) {

  const fromId = assetToCoinGeckoId[from as keyof typeof assetToCoinGeckoId];
  const toId = assetToCoinGeckoId[to as keyof typeof assetToCoinGeckoId];

  try {

    const response = await api.get("/simple/price", {
      params: {
        ids: fromId,
        vs_currencies: toId
      }
    });

    const rate = response.data[fromId][toId];

    return {
      rate,
      result: rate * amount
    };

  } catch (error: any) {

    if (axios.isAxiosError(error)) {

      const status = error.response?.status;

      if (status === 429) {
        throw new Error("Muitas requisições. Aguarde alguns segundos.");
      }

      if (status) {
        throw new Error(`Erro ao consultar cotação (HTTP ${status}).`);
      }

      throw new Error("Erro de conexão com o servidor. ");
    }

    throw new Error("Erro inesperado ao converter moeda.");
  }
}