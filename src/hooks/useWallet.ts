import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as walletService from "../services/walletService";
import type { Asset } from "../types/transaction";
import { useAuth } from "../context/AuthContext";

export const walletKeys = {
  balance: ["wallet", "balance"] as const,
  ledger: (page: number, limit: number) => ["wallet", "ledger", page, limit] as const,
};

export function useBalance() {
  return useQuery({
    queryKey: walletKeys.balance,
    queryFn: walletService.getBalance,
  });
}

export function useLedger(page = 1, limit = 10) {
  return useQuery({
    queryKey: walletKeys.ledger(page, limit),
    queryFn: () => walletService.getLedger(page, limit),
    placeholderData: (previous) => previous,
  });
}

/** Invalida saldo e extrato após qualquer movimentação. */
function useInvalidateWallet() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["wallet"] });
}

export function useDeposit() {
  const { user } = useAuth();
  const invalidate = useInvalidateWallet();

  return useMutation({
    mutationFn: ({ token, amount }: { token: Asset; amount: number }) => {
      if (!user) throw new Error("Usuário não carregado");
      return walletService.deposit({ userId: user.id, token, amount });
    },
    onSuccess: invalidate,
  });
}

export function useWithdraw() {
  const invalidate = useInvalidateWallet();

  return useMutation({
    mutationFn: ({ token, amount }: { token: Asset; amount: number }) =>
      walletService.withdraw(token, amount),
    onSuccess: invalidate,
  });
}

export function useSwap() {
  const invalidate = useInvalidateWallet();

  return useMutation({
    mutationFn: ({ from, to, amount }: { from: Asset; to: Asset; amount: number }) =>
      walletService.executeSwap(from, to, amount),
    onSuccess: invalidate,
  });
}
