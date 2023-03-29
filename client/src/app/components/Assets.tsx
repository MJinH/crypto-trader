import React from 'react'
import { AssetsProps } from './types'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

export default function Assets({ assets } : AssetsProps) {
  console.log(assets)
  return (
    <div className='mt-10 border-2 flex flex-col rounded-md'>
        <span 
          className='font-medium text-gray-400 text-lg p-4 border-b-2'
        >
          My Crypto
        </span>
        <div className='flex p-4 border-b-2'>
            <div className='flex-1 font-medium text-slate-600 border-1 asset-info'>Name</div>
            <div className='flex-1 font-medium text-slate-600 border-1 asset-info'>Total balance</div>
            <div className='flex-1 font-medium text-slate-600 border-1 asset-info'>Price</div>
            <div className='flex-1 font-medium text-slate-600 border-1 asset-info'>Performance</div>
        </div>
        {assets.map((asset) => (
          <div className='flex px-4 py-1'>
            <div className='flex-1 float-left py-6 flex items-center'>
                <Image 
                  className='object-contain rounded-full m-0'
                  src={`/${asset.logo}.png`}
                  alt='coin image'
                  width={30}
                  height={30}
                />
                <span className='ml-3 font-medium'>{asset.name}</span>
            </div>
            <div className='flex-1 font-medium flex items-center'>
                <span>{`${asset.amount.toFixed(5)} ${asset.name}`}</span>
            </div>
            <div className='flex-1 font-medium flex items-center'>
                <span>{`$${asset.pay}`}</span>
            </div>
            <div className={`flex-1 font-medium flex items-center ${asset.status === 'buy' ? 'text-emerald-400' : 'text-red-500'} text-lg`}>
                <FontAwesomeIcon icon={asset.status === 'buy' ?  faArrowUp : faArrowDown} />
                <span className='ml-2'>{asset.pay}</span>
            </div>
            <div className='flex items-center cursor-pointer'>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
          </div>     
        ))}
    </div>
  )
}
