import { z } from "zod"

/**
 * @description O depositSchema é um schema de validação criado com a biblioteca Zod para validar os dados de um formulário de depósito.
 */
export const depositSchema = z.object({
  userId: z.string().min(1, "Selecione um usuário"),
  asset: z.enum(["BRL", "BTC", "ETH", "USDT"]),
  amount: z.coerce.number().positive("Valor deve ser maior que zero"),
  note: z.string().optional()
})

export type DepositFormInput = z.input<typeof depositSchema>
