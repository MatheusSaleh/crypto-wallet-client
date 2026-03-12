import { createContext, useContext, useState } from "react";
import { users as mockUsers } from "../mocks/users";
import { transactions as mockTransactions } from "../mocks/transactions";
import type { Asset, Transaction } from "../types/transaction";
import type { User } from "../types/user";

interface DepositInput {
    userId: string;
    asset: Asset;
    amount: number;
    note?: string;
}

interface AppContextType {
    users: User[];
    transactions: Transaction[];
    deposit: (data: DepositInput) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {

    const [users, setUsers] = useState(mockUsers);
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

    function deposit({ userId, asset, amount, note }: DepositInput){

        if (amount <= 0){
            throw new Error("Valor Inválido")
        }

        const user = users.find(u => u.id === userId);

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const updatedUsers = users.map(u => {

            if (u.id !== userId) return u;

            return {
                ...u,
                balances: {
                    ...u.balances,
                    [asset]: u.balances[asset] + amount
                }
            }
        })

        setUsers(updatedUsers);

        const newTransaction: Transaction = {

            id: crypto.randomUUID(),
            userId,
            asset,
            amount,
            type: "DEPOSIT",
            note,
            createdAt: new Date()
        }

        setTransactions(prev => [...prev, newTransaction]);
        
    }

    return (
        <AppContext.Provider value={{ users, transactions, deposit }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {

    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useApp deve ser usado dentro de um AppProvider")
    }

    return context;
}