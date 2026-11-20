import { z } from "zod"
import { ASSETS } from "../types/transaction"

/**
 * @description Schema de validação do formulário de depósito/saque.
 */
export const transactionSchema = z.object({
  asset: z.enum(ASSETS),
  amount: z.coerce.number().positive("Valor deve ser maior que zero"),
})

export type TransactionFormInput = z.input<typeof transactionSchema>
