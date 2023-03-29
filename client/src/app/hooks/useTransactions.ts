import { useCallback, useState } from 'react'
import useCustomFetch from './useCustomFetch'
import { AxiosResponse } from "axios";

export function useTransactions() {
 const { fetchWithCache, loading } = useCustomFetch()
 const [transactions, setTransactions] = useState<AxiosResponse<any, any> | null>(null)

  const fetchAll = useCallback(
    async () => {
      const data = await fetchWithCache("/transactions/get")
      setTransactions(data)
    },
    [fetchWithCache]
    
    )

  const invalidateData = useCallback(() => {
    setTransactions(null)
  }, [])

 return { data: transactions, fetchAll, invalidateData, loading }
}
