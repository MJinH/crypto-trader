import React from 'react'
import { TransactionsProps, Transaction } from './types';

export default function Transactions({ transactions }: TransactionsProps) {
  return (
    <div className='mt-20 overflow-auto h-full overflow-x-hidden'>
      {transactions?.map((transaction: Transaction) => (
        <div key={transaction.id} className='px-10 py-5 bg-zinc-50 rounded-lg mb-8 flex justify-around items-center'>
          <span className='font-bold text-lg'>{`#${transaction.id.slice(0,5)}...`}</span>
          <span>{transaction.date}</span>
          <span className='text-lg font-bold text-stone-500'>{transaction.name}</span>
          <span className='text-gray-400 text-lg'>{transaction.amount}</span>
          <div className='py-3 px-5 bg-green-200 flex items-center rounded-md'>
            <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
            <span className='font-medium text-emerald-500'>Paid</span>
          </div>
        </div>
      ))}
    </div>
  )
}
