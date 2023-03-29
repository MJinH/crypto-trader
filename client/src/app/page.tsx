'use client';
import { Fragment, useEffect, useCallback, useState } from "react"
import Assets from "./components/Assets";
import Loading from "./components/Loading";
import Sidebar from "./components/Sidebar"
import Transactions from "./components/Transactions";
import useBalance from "./hooks/useBalance";
import { useTransactions } from "./hooks/useTransactions"

export default function Home() {

  const { data: transactions, ...transactionsUtils } = useTransactions()
  const { data: balance, ...balanceUtils } = useBalance()
  const [loading, setLoading] = useState(true)

  const loadAllTransactions = useCallback(
    async () => {
      setLoading(true)
      transactionsUtils.invalidateData()
      balanceUtils.invalidateData()

      await transactionsUtils.fetchAll()
      await balanceUtils.fetchAll()
      setLoading(false)
    },
    [transactionsUtils, balanceUtils]
  )

  useEffect(() => {
    if ((transactions === null && !transactionsUtils.loading) || (balance === null && !balanceUtils.loading)) loadAllTransactions()
  }, [loadAllTransactions])

  return (
    <Fragment>
      <main className='overflow-hidden h-screen flex'>
        <Sidebar />
        { loading ? <Loading />  :
          <div className='mx-auto w-3/5 pt-20 wrapper'>
            <h1 className='text-4xl tracking-wide font-bold mb-3'>Balance</h1>
            <span className='text-xl'>{`$${balance?.cash}`}</span>
            {/* <Transactions transactions={transactions} />  */}
            <Assets assets={balance.coins} /> 
          </div>
        }
      </main>
    </Fragment>
  )
}
