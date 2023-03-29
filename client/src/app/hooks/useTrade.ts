import { useCallback, useState } from "react";
import useCustomFetch from "./useCustomFetch";
import { AxiosResponse } from "axios";
import { Trade } from "../components/types";

export default function useTrade() {
    const { fetchWithCache, loading } = useCustomFetch()
    const [trades, setTrades] = useState<any>(null)

    const fetchAll = useCallback(
        async () => {
            const data = await fetchWithCache("/coins/get")
            setTrades(data)
        },
        [fetchWithCache]
    )

    const invalidateData = useCallback(() => {
        setTrades(null)
    }, [])

    return { data: trades, fetchAll, invalidateData, loading }
}
