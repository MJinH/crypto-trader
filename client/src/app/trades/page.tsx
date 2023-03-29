'use client';
import React, { Fragment, useEffect, useCallback, useState, useMemo } from 'react'
import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar'
import Trades from '../components/Trades';
import useTrade from '../hooks/useTrade'
import { Trade } from '../components/types';

export default function trade() {

  const { data: trades, ...tradesUtils } = useTrade()
  const [loading, setLoading] = useState(false)
  const [isList, setIsList] = useState(false)

  const filterTrades = useMemo(
    () => trades?.filter((trade : Trade) => {
      return trade.status
    }),
    [trades]
  )

  const loadAllTrades = useCallback(
    async () => {
      setLoading(true)
      tradesUtils.invalidateData()
      await tradesUtils.fetchAll()
      setLoading(false)
    },
    [tradesUtils]
  )

  useEffect(() => {
    if (trades === null && !tradesUtils.loading) loadAllTrades()
  }, [loadAllTrades, trades, tradesUtils.loading])

  return (
    <Fragment>
      <main className='overflow-hidden h-screen flex'>
        <Sidebar />
        <div className='mx-auto w-3/5 pt-20 wrapper'>
          <span className='text-4xl tracking-wide font-bold mb-3 pb-3 text-purple-400 border-b-2 border-purple-400'>Spot</span>
          <ul className='flex mt-12 mb-6'>
            <li className={`p-2 font-bold text-lg ${!isList ? 'text-blue-600 bg-blue-300': 'text-neutral-400 bg-slate-50'  } hover:text-blue-600 rounded-full cursor-pointer hover:bg-blue-300`} onClick={() => setIsList(false)}>All markets</li>
            <li className={`p-2 ml-6 font-bold text-lg ${isList ? 'text-blue-600 bg-blue-300': 'text-neutral-400 bg-slate-50'} text-neutral-400 hover:text-blue-600 rounded-full cursor-pointer hover:bg-blue-300`} onClick={() => setIsList(true)}>Watchlist</li>
          </ul>
          <div className='flex py-4 border-y-2 border-solid border-slate-400'>
            <div className='w-3/5 font-medium text-slate-700 border-1 trade-info'>Name</div>
            <div className='w-2/5 font-medium text-slate-700 border-1 trade-info'>Price</div>
            <div className='w-2/5 font-medium text-slate-700 border-1 trade-info'>Volume</div>
            <div className='w-2/5 font-medium text-slate-700 border-1 trade-info'>24h Change</div>
            <div className='w-1/5 font-medium text-slate-700 border-1 trade-info'>Watch</div>
          </div>
          { loading ? <Loading /> : <Trades trades={isList? filterTrades : trades} reload={loadAllTrades}/> }
        </div>
      </main>
    </Fragment>
  )
}
