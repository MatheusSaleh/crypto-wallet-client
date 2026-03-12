export type Asset = "BRL" | "BTC" | "ETH" | "USDT";

export type TransactionType = "DEPOSIT" | "WITHDRAW";

/**
 * @author: Matheus Saleh
 * @description: Esta interface representa uma transação financeira, que pode ser um depósito ou um saque. Cada transação possui um identificador único, o ID do usuário associado, o ativo envolvido (BRL, BTC, ETH ou USDT), o valor da transação, o tipo (DEPOSIT ou WITHDRAW), uma nota opcional e a data de criação. Esta estrutura é fundamental para registrar e gerenciar as transações financeiras dos usuários na plataforma.
 */
export interface Transaction {
  id: string;
  user?: string;
  userId: string;
  type: TransactionType;
  asset: Asset;
  amount: number;
  note?: string;
  createdAt: Date;
}
