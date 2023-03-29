'use client';
import React, { Fragment, useState, useEffect, useCallback } from 'react'
import Sidebar from '../components/Sidebar'
import { useTransactions } from '../hooks/useTransactions'
import Transactions from '../components/Transactions'
import Loading from '../components/Loading'

export default function page() {
  
  const { data: transactions, ...transactionsUtils } = useTransactions()
  const [loading, setLoading] = useState(true)

  const loadAllTransactions = useCallback(
    async () => {
    setLoading(true)
    transactionsUtils.invalidateData()

    await transactionsUtils.fetchAll()
    setLoading(false)
    },
    [transactionsUtils]
  )

  useEffect(() => {
    if (transactions === null && !transactionsUtils.loading) loadAllTransactions()
  }, [loadAllTransactions])
  return (
    <Fragment>
      <main className='overflow-hidden h-screen flex'>
        <Sidebar />
        { loading ? <Loading /> :  
          <div className='mx-auto w-3/5 pt-20 wrapper'>
            <h1 className='text-4xl tracking-wide font-bold mb-3'>Transactions</h1>
            <Transactions transactions={transactions} /> 
          </div>
        }
      </main>
    </Fragment>
  )
}
