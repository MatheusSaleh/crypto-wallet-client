import type { User } from "../types/user";

export const users: User[] = [
 { id: "1", name: "João Silva", email: "joao@email.com", status: "ACTIVE", lastActivity: "2024-03-01", createdIn: "2024-01-10", balances: { BRL: 1000, BTC: 0.5, ETH: 2, USDT: 500 } },
 { id: "2", name: "Maria Souza", email: "maria@email.com", status: "ACTIVE", lastActivity: "2024-03-02", createdIn: "2024-01-11", balances: { BRL: 0, BTC: 0, ETH: 0, USDT: 0 } },
 { id: "3", name: "Pedro Costa", email: "pedro@email.com", status: "PENDING", lastActivity: "2024-03-03", createdIn: "2024-01-12", balances: { BRL: 0, BTC: 0, ETH: 0, USDT: 0 } },
 { id: "4", name: "Ana Lima", email: "matheusxmg@email.com", status: "BLOCKED", lastActivity: "2024-03-04", createdIn: "2024-01-13", balances: { BRL: 0, BTC: 0, ETH: 0, USDT: 0 } },
 { id: "5", name: "Lucas Rocha", email: "lucas@email.com", status: "ACTIVE", lastActivity: "2024-03-05", createdIn: "2024-01-14", balances: { BRL: 0, BTC: 0, ETH: 0, USDT: 0 } },
 { id: "6", name: "Juliana Alves", email: "juliana@email.com", status: "ACTIVE", lastActivity: "2024-03-06", createdIn: "2024-01-15", balances: { BRL: 0, BTC: 0, ETH: 0, USDT: 0 } },
 { id: "7", name: "Rafael Santos", email: "rafael@email.com", status: "ACTIVE", lastActivity: "2024-03-07", createdIn: "2024-01-16", balances: { BRL: 0, BTC: 0, ETH: 0, USDT: 0 } },
 { id: "8", name: "Fernanda Gomes", email: "fernanda@email.com", status: "PENDING", lastActivity: "2024-03-08", createdIn: "2024-01-17", balances: { BRL: 0, BTC: 0, ETH: 0, USDT: 0 } },
 { id: "9", name: "Bruno Dias", email: "bruno@email.com", status: "ACTIVE", lastActivity: "2024-03-09", createdIn: "2024-01-18", balances: { BRL: 0, BTC: 0, ETH: 0, USDT: 0 } },
 { id: "10", name: "Carla Martins", email: "carla@email.com", status: "ACTIVE", lastActivity: "2024-03-10", createdIn: "2024-01-19", balances: { BRL: 0, BTC: 0, ETH: 0, USDT: 0 } }
]