import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import transactionRoutes from './routes/transactions'
import coinRoutes from './routes/trades'
import balanceRoutes from './routes/balance'

const app = express()
app.use(cors({
    origin: true,
    credentials: true,
}))

app.use(morgan("dev"))
app.use(express.json())
app.use("/api/transactions",transactionRoutes)
app.use("/api/coins", coinRoutes)
app.use("/api/balance", balanceRoutes)

let port = 4000
app.listen(port, async () => {
    console.log(`server running at ${port}`)
})