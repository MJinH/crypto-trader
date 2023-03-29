'use client';
import { AppContext } from "../context/context"
import { useCallback, useContext } from "react"
import useWrappedRequest from "./useWrappedRequest";
import axios, { AxiosResponse } from "axios";
import Axios from "axios";

export default function useCustomFetch() {
    Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api"
    Axios.defaults.withCredentials = true

    const { cache } = useContext(AppContext)
    const { loading, wrappedRequest } = useWrappedRequest()

    const fetchWithCache = useCallback(
        async (
            endpoint: string,
        ): Promise<AxiosResponse<any, any> | null> =>
        wrappedRequest<AxiosResponse<any, any>>(async () => {
            const cacheKey = getCacheKey(endpoint)
            const cacheResponse = cache?.current.get(cacheKey)

            if (cacheResponse) {
                const data = JSON.parse(cacheResponse)
                return data as Promise<AxiosResponse<any, any>>
            }
            const result = await axios.get<AxiosResponse<any, any>>(endpoint)
            cache?.current.set(cacheKey, JSON.stringify(result.data))
            return result.data
        }),
        [cache, wrappedRequest]
    )

    const fetchWithoutCache = useCallback(
        async (
            endpoint: string,
            params: Object,
        ): Promise<AxiosResponse<any, any> | null> =>
        wrappedRequest<AxiosResponse<any,any>>(async () => {
            const result = await axios.post<AxiosResponse<any,any>>(endpoint, params)
            return result
        }),
        [wrappedRequest]
    )

    const clearCacheByEndpoint = useCallback(
        (endpoint: string) => {
            if (cache?.current === undefined) return
            const cacheKeys = Array.from(cache.current.keys())
            for (const key of cacheKeys) {
                if (key.startsWith(endpoint)) {
                    cache.current.delete(key)
                    return
                }
            }
        },
        [cache]
    )

    return { fetchWithCache, fetchWithoutCache, clearCacheByEndpoint, loading }
}

function getCacheKey(endpoint: string) {
    return `${endpoint}`
  }
  
