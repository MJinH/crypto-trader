import React, { useCallback, useState, Fragment, useEffect } from 'react'
import { SetTradeListFunction, Trade, TradesProps, CoinInfo } from './types'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import useCustomFetch from '../hooks/useCustomFetch'
import Modal from './Modal'
import useBalance from '../hooks/useBalance'

export default function Trades({ trades, reload }: TradesProps) {

  const { fetchWithoutCache, clearCacheByEndpoint } = useCustomFetch()
  const [modal, setModal] = useState<boolean>(false)
  const [coinInfo, setCoinInfo] = useState<CoinInfo | null>(null)
  const { data: balance, ...balanceUtils } = useBalance()

  const setTradeList = useCallback<SetTradeListFunction>(
    async({ id, status }) => {
      await fetchWithoutCache("/coins/create/list", { id, status })
      clearCacheByEndpoint("/coins/get")
      await reload()
    },
    [fetchWithoutCache, clearCacheByEndpoint]
  )

  const loadAllBalance = useCallback(
    async () => {
      balanceUtils.invalidateData()
      await balanceUtils.fetchAll()
    },
    [balanceUtils]
  )

  useEffect(() => {
    if (balance === null) loadAllBalance()
  }, [balance])

  return (
    <Fragment>
      <div className='py-2 overflow-auto h-full overflow-x-hidden trade'>
        {trades?.map((trade: Trade) => (
          <div 
            key={trade.id}
            className='flex cursor-pointer'
            onClick={() => { setCoinInfo({ name: trade.name, logo: trade.logo, price: trade.balanceUsd, status: 'Buy' }); setModal(true); }}
          >
              <div className='w-3/5 float-left py-6'>
                <Image 
                  className='trade-img object-contain rounded-full m-0'
                  src={`/${trade.logo}.png`}
                  alt='coin image'
                  width={40}
                  height={40}  
                />
              </div>
              <div className='w-2/5 flex items-center font-medium trade-inner'>{`$${trade.balanceUsd}`}</div>
              <div className='w-2/5 flex items-center font-medium trade-inner'>{trade.volume}</div>
              <div className={`w-2/5 flex items-center font-medium trade-inner ${trade.change < 0 ? 'text-red-500' : 'text-green-500'}`}>{`${trade.change}%`}</div>
              <div className='w-1/5 flex items-center'>
                <FontAwesomeIcon icon={faStar} className={`trade-icon ${!trade.status ? 'text-slate-300' : 'text-cyan-600'} text-xl ml-3 cursor-pointer`} onClick={async () => await setTradeList({ id: trade.id, status: !trade.status })} />
              </div>
          </div>
        ))}
        { modal && coinInfo !== null && <Modal coinInfo={coinInfo} setModal={setModal} balance={balance.cash} reload={loadAllBalance} fetch={fetchWithoutCache} clear={clearCacheByEndpoint} /> }
      </div>
    </Fragment>
  )
}
