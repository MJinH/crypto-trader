export type Transaction = {
    id: string,
    date: string,
    name: string,
    amount: number,
}

export type Trade = {
    id: string,
    name: string,
    logo: string,
    balanceUsd: number,
    volume: string,
    change: number,
    status: boolean
}

export type CoinInfo = {
    name: string,
    price: number,
    logo: string,
    status: string,
}

export type AssetInfo = {
    name: string,
    pay: number,
    amount: number,
    logo: string,
    status: string,
}

export type TransactionsProps = {
    transactions: any | null
}

export type ModalProps ={
    coinInfo: CoinInfo
    setModal: (status: boolean) => void
    balance: number
    reload: any
    fetch: any
    clear: any
}

export type AssetsProps = {
    assets: AssetInfo[]
}

export type TradesProps = {
    trades: any | null
    reload: any
}

export type SetTradeListFunction = (params: {
    id: string,
    status: boolean,
}) => Promise<void>

export type SetTradeListParams = {
    id: string,
    status: boolean
}