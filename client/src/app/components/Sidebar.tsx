import Image from 'next/image'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faChartSimple, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className='bg-indigo-600 h-full w-64 rounded-r-3xl sidebar'>
        <div className='w-full h-44 flex items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-r-3xl coin-img'>
            <Image 
              className='object-contain mx-auto text-inherit coinbase-img rounded-full hover:sepia'
              src='/coinbase.jpg'
              alt='coinbase image'
              width={100}
              height={100}  
            />
        </div>
        <div className='w-full flex flex-col mt-8 text-2xl link'>
            <Link href='/'>
              <div className='p-3 text-neutral-100 font-medium flex items-center w-4/5 mx-auto hover:rounded-xl hover:bg-slate-400 cursor-pointer link-inner'>
                  <FontAwesomeIcon className='w-5 h-5 link-icon' icon={faChartPie} />
                  <span className='w-5'></span>
                  <span className=''>Portfolio</span>
              </div>
            </Link>
            <Link href='/trades'>
              <div className='p-3 text-neutral-100 font-medium flex items-center w-4/5 mx-auto hover:rounded-xl hover:bg-slate-400 cursor-pointer link-inner'>
                  <FontAwesomeIcon className='w-5 h-5 link-icon' icon={faChartSimple} />
                  <span className='w-5'></span>
                  <span className=''>Trade</span>
              </div>
            </Link>
            <Link href='/transactions'>
              <div className='p-3 text-neutral-100 font-medium flex items-center w-4/5 mx-auto hover:rounded-xl hover:bg-slate-400 cursor-pointer link-inner'>
                  <FontAwesomeIcon className='w-5 h-5 link-icon' icon={faCreditCard} />
                  <span className='w-5'></span>
                  <span className=''>Transaction</span>
              </div>
            </Link>
        </div>
    </div>
  )
}
