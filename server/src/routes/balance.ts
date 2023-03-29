import { Router, Request, Response } from "express";
import mockData from '../../mock-data.json'
import { Balance } from "../utils/types";

const data: { balance: Balance } = {
    balance: mockData.balance,
} 

export const getBalance = async (_:Request, res:Response) => {
    try {
        return res.json(data.balance)
    } catch(err) {
        return res.status(404).json({ err: "Can not get balance" })
    }
}

export const createCrypto = async (req:Request, res:Response) => {
    const { name, price, pay, logo } = req.body 
    try {
        for(let i = 0; i < data.balance.coins.length; i++) {
            if(data.balance.coins[i].name && data.balance.coins[i].name === name) {
                data.balance.coins[i].amount += pay / price
                data.balance.coins[i].pay = Number(pay) + Number(data.balance.coins[i].pay)
                data.balance.cash -= pay
                return res.status(200).json(data.balance.coins)
            }
        }
        data.balance.cash -= pay
        const newCrypto = {
            name: name,
            pay: pay,
            amount: pay / price,
            logo: logo,
            status: 'buy',
        }
        data.balance.coins.push(newCrypto)
        return res.status(200).json(data.balance.coins)
    } catch(err) {
        return res.status(404).json({ err: "Can not create crypto" })
    }
}


const router = Router()
router.get("/get", getBalance)
router.post("/create", createCrypto)
export default router