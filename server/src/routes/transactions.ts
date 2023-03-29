import { Router, Request, Response } from "express";
import { Transaction } from "../utils/types";
import mockData from "../../mock-data.json";

const data: { transactions: Transaction[] } = {
    transactions: mockData.transactions
}
// {
//     "id": "1",
//     "date":"now",
//     "name": "BTC",
//     "amount": 1000
// },

const getTransactions =  async (_: Request, res: Response) => {
    try {
        return res.json(data.transactions)
    } catch (err) {
        return res.status(404).json({ error: "Can not get transactions" })
    }
}

const createTransactions = async (req: Request, res: Response) => {
    const { id, name, amount, status } = req.body
    console.log(id, name)
    try {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const curDate = year + '-' + month + '-' + day
        const transaction = {
            id: id,
            date: curDate,
            name: name,
            amount: amount,
            status: status,
        }
        data.transactions.push(transaction)
        return res.status(200).json(data.transactions)
    } catch(err) {
        return res.status(404).json({ error: "Can not create transaction" })
    }
}

const router = Router()
router.get("/get", getTransactions)
router.post("/create", createTransactions)
export default router