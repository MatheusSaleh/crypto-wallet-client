import { useQuery } from "@tanstack/react-query";
import { getTicker } from "../services/marketService";

/** Cotações do letreiro, atualizadas a cada minuto (o backend faz cache de 60s). */
export function useTicker() {
  return useQuery({
    queryKey: ["market", "ticker"],
    queryFn: getTicker,
    refetchInterval: 60_000,
    staleTime: 60_000,
  });
}
