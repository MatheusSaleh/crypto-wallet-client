import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  transactionSchema,
  type TransactionFormInput,
} from "../../schemas/transactionSchema";
import { ASSETS } from "../../types/transaction";
import { useDeposit, useWithdraw } from "../../hooks/useWallet";
import { getErrorMessage } from "../../services/api";

interface TransactionProps {
  type: "DEPOSIT" | "WITHDRAW";
}

export default function TransactionForm({ type }: TransactionProps) {
  const depositMutation = useDeposit();
  const withdrawMutation = useWithdraw();
  const mutation = type === "DEPOSIT" ? depositMutation : withdrawMutation;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionFormInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: { asset: "BRL" },
  });

  async function onSubmit(data: TransactionFormInput) {
    const { asset, amount } = transactionSchema.parse(data);

    try {
      await mutation.mutateAsync({ token: asset, amount });
      toast.success(
        `${type === "DEPOSIT" ? "Depósito" : "Saque"} de ${amount} ${asset} realizado com sucesso`,
      );
      reset({ asset });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 space-y-4 bg-white shadow rounded-xl dark:bg-gray-800"
      >
        <div>
          <label className="block mb-1 text-sm dark:text-gray-300">Ativo</label>

          <select
            {...register("asset")}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {ASSETS.map((asset) => (
              <option key={asset} value={asset}>
                {asset}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm dark:text-gray-300">Valor</label>

          <input
            type="number"
            step="any"
            {...register("amount")}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          {errors.amount && (
            <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {mutation.isPending
            ? "Processando..."
            : type === "DEPOSIT"
              ? "Confirmar depósito"
              : "Confirmar saque"}
        </button>
      </form>
    </div>
  );
}
