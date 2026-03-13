# Crypto Wallet Dashboard

Aplicação web desenvolvida em **React + TypeScript** que simula a gestão de usuários e movimentações de uma carteira de criptoativos.

O sistema permite **depósitos, saques, visualização de saldos e conversão de moedas utilizando dados reais da CoinGecko**.

---

# Funcionalidades

- Listagem de usuários
- Depósito de ativos
- Saque de ativos com validação de saldo
- Atualização de saldo em tempo real
- Histórico de movimentações (depósitos e saques)
- Conversão de moedas utilizando dados reais da CoinGecko
- Interface responsiva com suporte a **dark mode**
- Feedback visual com **toasts de sucesso e erro**
- Spinner de carregamento durante chamadas de API

---

# Tecnologias utilizadas

- React
- TypeScript
- TailwindCSS
- React Hook Form
- Zod
- Axios
- React Hot Toast
- CoinGecko API

---

# Como rodar o projeto

## 1 - Clonar o repositório

```bash
git clone https://github.com/MatheusSaleh/crypto-wallet-client
```

## 2 - Entrar na pasta do projeto
cd crypto-wallet-client

## 3 - Instalar as depêndencias com pnpm
pnpm install 

## 4 - Rodar o projeto
pnpm run dev

## 5 - O projeto será iniciado em 

http://localhost:5173


# Estrutura do projeto

A aplicação foi organizada separando interface, lógica de negócio e consumo de API, facilitando manutenção e escalabilidade.

```plaintext
src
 ├── components
 │    ├── conversion
 │    │     └── ConversionCard.tsx
 │    ├── layout
 │    │     └── DashboardLayout.tsx
 │    │     └── Header.tsx
 │    │     └── Sidebar.tsx
 │    └── transaction
 │          └── BalancesTable.tsx
 │          └── TransactionForm.tsx
 │          └── TransctionsTable.tsx
 ├── context
 │    └── AppContext.tsx
 │
 ├── hooks
 │    └── useConversion.ts
 │    └── useTheme.ts
 │
 ├── mocks
 │    ├── users.ts
 │    └── transactions.ts
 │    └── assets.ts
 │
 ├── router
 │    └── router.tsx
 │
 ├── schemas
 │    └── transactionSchema.ts
 │
 ├── services
 │    ├── api.ts
 │    └── conversionService.ts
 │
 ├── types
 │    ├── user.ts
 │    └── transaction.ts
 │
 ├── utils
 │    └── assetToCoinGeckoId.ts
 │    └── dateParse.ts
 │
 └── pages
  ├── Convert
  │    └── Convert.tsx
  ├── Deposit
  │     └── Deposit.tsx
  ├── Home
  │     └── Home.tsx
  ├── Login
  │     └── Login.tsx
  ├── Users
  │     └── Users.tsx
  └── Withdraw
    └── Withdraw.tsx
```


# Explicação da Arquitetura

## Context API

Foi utilizado React Context para centralizar dados globais da aplicação como usuários, saldos, transações e funções de depósito e saque afim de evitar o prop drilling e permtir que diferentes componentes acessem o estado da aplicação.

## Hooks Customizados

A lógica de conversão foi toda isolada no hook useConversion.ts, este hook é responsável por controle de loading, debounce de requisição, tratamento de erros e integração com a API afim de tornar a lógica da UI e deixar o código mais reutilizável e testável.

## Services

A camada services centraliza chamadas externas, no conversionService.ts temos o serviço responsável por consumir a API da CoinGecko e retornar os dados da conversão

## Componentização

Os componentes foram separados para promover reutilização:

- TransactionForm

- BalancesTable

- TransactionsTable

- ConversionCard

Isso evita duplicação de código entre telas de depósito e saque.


