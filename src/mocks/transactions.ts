import type { Transaction } from "../types/transaction";

export const transactions: Transaction[] = [
 { id: "1", user: "João Silva", userId: "1", type: "DEPOSIT", asset: "BRL", amount: 5000, note: "Depósito inicial", createdAt: new Date("2024-01-10T10:00:00Z") },
 { id: "2", user: "Maria Souza", userId: "2", type: "WITHDRAW", asset: "BTC", amount: 0.02, note: "Saque de BTC", createdAt: new Date("2024-01-11T10:00:00Z") },
 { id: "3", user: "Pedro Costa", userId: "3", type: "DEPOSIT", asset: "USDT", amount: 300, note: "Depósito de USDT", createdAt: new Date("2024-01-12T10:00:00Z") },
 { id: "4", user: "Lucas Rocha", userId: "4", type: "WITHDRAW", asset: "ETH", amount: 1.5, note: "Saque de ETH", createdAt: new Date("2024-01-13T10:00:00Z") },
 { id: "5", user: "Ana Lima", userId: "5", type: "DEPOSIT", asset: "BRL", amount: 800, note: "Depósito inicial", createdAt: new Date("2024-01-14T10:00:00Z") },
 { id: "6", user: "Bruno Dias", userId: "6", type: "WITHDRAW", asset: "BTC", amount: 0.01, note: "Saque de BTC", createdAt: new Date("2024-01-15T10：00：00Z") }
]