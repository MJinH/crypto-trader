export type Transaction = {
    id: string,
    date: string,
    name: string,
    amount: number,
    status: string,
}

export type Coin = {
    id: string,
    name: string,
    logo: string,
    balanceUsd: number,
    volume: string,
    change: number,
    status: boolean
}

export type Balance = {
    cash: number,
    coins: any,
}