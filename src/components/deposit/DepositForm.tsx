import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import {
  depositSchema,
  type DepositFormInput,
} from "../../schemas/depositSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export default function DepositForm() {
  const { users, deposit } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DepositFormInput>({
    resolver: zodResolver(depositSchema),
  });

  function onSubmit(data: DepositFormInput) {
    const parsed = depositSchema.parse(data);

    deposit(parsed);
    reset();
    toast.success("Operação realizada com sucesso!");
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 space-y-4 bg-white shadow rounded-xl dark:bg-gray-800"
      >
        <div>
          <label className="block mb-1 text-sm dark:text-gray-300">
            Usário
          </label>

          <select
            {...register("userId")}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Selecione um usuário</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.userId && (
            <p className="mt-1 text-sm text-red-500">{errors.userId.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm dark:text-gray-300">Ativo</label>

          <select
            {...register("asset")}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="BRL">BRL</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
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

        <div>
          <label className="block mb-1 text-sm dark:text-gray-300">
            Observação
          </label>

          <input
            type="text"
            {...register("note")}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Confirmar depósito
        </button>
      </form>
    </div>
  );
}
