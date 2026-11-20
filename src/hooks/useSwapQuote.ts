import { useQuery } from "@tanstack/react-query";
import { getSwapQuote } from "../services/walletService";
import type { Asset } from "../types/transaction";

export interface PairRate {
  /** Quantos "to" vale 1 "from" */
  price: number;
  /** Taxa cobrada sobre o valor convertido (ex.: 0.015 = 1,5%) */
  feeRate: number;
}

/**
 * Cotação do par, atualizada a cada 30s.
 *
 * Pede ao backend a cotação de 1 unidade e calcula o resto localmente, assim
 * digitar o valor não gera uma requisição por tecla. A taxa vem da própria
 * resposta do backend (fee / price), sem duplicar a regra no frontend.
 */
export function useSwapQuote(from: Asset, to: Asset) {
  return useQuery({
    queryKey: ["swap", "rate", from, to],
    enabled: from !== to,
    refetchInterval: 30_000,
    staleTime: 15_000,
    queryFn: async (): Promise<PairRate> => {
      const quote = await getSwapQuote(from, to, 1);
      return {
        price: quote.price,
        feeRate: quote.price > 0 ? quote.fee / quote.price : 0,
      };
    },
  });
}
