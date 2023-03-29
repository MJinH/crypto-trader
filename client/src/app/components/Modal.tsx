import React, { Fragment, useEffect, useRef, useState } from 'react'
import { ModalProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons' 
import Image from 'next/image'
import uuid from 'react-uuid'

export default function Modal({ coinInfo, setModal, balance, reload, fetch, clear }: ModalProps) {
  const inputValue = useRef<any>('')
  const [input, setInput] = useState<string>('0')
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const setInputValue = (e: any) => {
    setInput(e)
    inputValue.current = e
  }

  const checkBalance = async () => {
    if (inputValue.current > balance) {
      setError(true)
      return
    }
    setLoading(true)
    await fetch("/balance/create", { name: coinInfo.name, price: coinInfo.price, pay: inputValue.current, logo: coinInfo.logo })
    await fetch("/transactions/create", { id: uuid(), name: coinInfo.name, amount: inputValue.current, status: 'buy' })
    clear("/balance/get")
    clear("/transactions/get")
    setLoading(false)
    setModal(false)
  }

  return (
    <Fragment>
      <div className='w-screen h-screen z-10 bg-zinc-700 absolute top-0 left-0 opacity-50 flex justify-center' />
      <div className='w-1/4 h-auto bg-slate-100 opacity-100 z-20 absolute top-20 translate-x-2/4 right-1/2 rounded-md modal'>
        <div className='flex justify-between py-3 px-5 border-b-2 border-b-slate-200 items-center'>
            <span className='font-medium'>Trade</span>
            <FontAwesomeIcon className='cursor-pointer' icon={faXmark} onClick={() => setModal(false)} />
        </div>
        { loading ? <div className='h-40 w-full flex items-center justify-center'><span className='animate-ping h-5 w-5 bg-sky-400 opacity-75 rounded-full'></span></div> : 
        <div className='flex py-3 px-7 flex-col items-center justify-center'>
            <div className={`flex mt-5 mb-16 ${error ? 'text-rose-600 animate-bounce' : ''}`}>
                <span className='font-medium'>$</span>
                <input 
                  id='input'
                  className={`w-20 text-4xl outline-none bg-slate-100`}
                  placeholder={input}
                  type='number'
                  ref={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onClick={() => setError(false) }
                />
            </div>
            <div className='flex justify-around w-full'>
                <div 
                  className='py-2 px-5 rounded-full font-semibold text-lg bg-slate-300 cursor-pointer'
                  onClick={() => { setError(false); setInputValue('10') } }
                >
                  $10
                </div>
                <div 
                  className='py-2 px-5 rounded-full font-semibold text-lg bg-slate-300 cursor-pointer'
                  onClick={() => { setError(false); setInputValue('50') } }
                >
                  $50
                </div>
                <div 
                  className='py-2 px-5 rounded-full font-semibold text-lg bg-slate-300 cursor-pointer'
                  onClick={() => { setError(false); setInputValue('100')} }
                >
                  $100
                </div>
            </div>
            <button className='flex items-center my-8 py-3 px-7 w-full bg-sky-400 rounded-full justify-center cursor-pointer' onClick={() => checkBalance()}>
                <span className='font-medium text-xl mr-5 text-slate-200'>Buy</span>
                <Image 
                  className='rounded-full'
                  src={`/${coinInfo.logo}.png`}
                  alt='coin image'
                  width={40}
                  height={40}  
                />
            </button>
            <div className='flex px-7 w-full justify-between'>
                <span className='font-light'>{`${coinInfo.name} balance`}</span>
                <span className='font-light'>{`1 ${coinInfo.name} = $${coinInfo.price}`}</span>
            </div>
        </div>  
        }
      </div>
    </Fragment>
  )
}
