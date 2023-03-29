import { Router, Request, Response } from "express";
import mockData from '../../mock-data.json'
import { Coin } from "../utils/types";


const data: { coins: Coin[], listCoins: Coin[] | null } = {
    coins: mockData.coins,
    listCoins: null,
}

export const getCoins = async(_:Request, res: Response) => {
    try {
        return res.json(data.coins)
    } catch(err) {
        return res.status(404).json({ error: "Can not get coins" })
    }
}

export const getList = async(_:Request, res:Response) => {
    try {
        return res.json(data.listCoins)
    } catch(err) {
        return res.status(404).json({ error: "Can not get list coins" })
    }
}

export const createList = async(req: Request, res:Response) => {
    const { id, status } = req.body
    try {
        data.coins.map((d) => {
            if (d.id === id) {
                d.status = status
                return
            }
        })
        return res.status(200).json(data.coins)
    } catch(err) {
        return res.status(404).json({ error: "Can not create list" })        
    }
}

const router = Router()
router.get('/get', getCoins)
router.post('/create/list', createList)
export default router