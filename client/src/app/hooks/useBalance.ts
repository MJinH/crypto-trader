import React, { useState, useCallback } from 'react'
import useCustomFetch from './useCustomFetch'

export default function useBalance() {
    const { fetchWithCache, loading } = useCustomFetch()
    const [balance, setBalance] = useState<any>(null)

    const fetchAll = useCallback(
        async () => {
            const data = await fetchWithCache("/balance/get")
            setBalance(data)
        }
        ,[fetchWithCache]
    )

    const invalidateData = () => {
        setBalance(null)
    }

    return { data: balance, fetchAll, invalidateData, loading }
}
