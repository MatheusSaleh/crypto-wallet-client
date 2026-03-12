export type UserStatus = "ACTIVE" | "PENDING" | "BLOCKED";

export interface User {

    id: string;
    name: string;
    email: string;
    status: UserStatus,
    createdIn: string;
    lastActivity: string;

    balances: {
        BRL: number;
        BTC: number;
        ETH: number;
        USDT: number;
    }
}