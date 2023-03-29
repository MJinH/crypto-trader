import { useCallback, useContext, useState } from "react";
import { AppContext } from "../context/context";
import { AxiosResponse } from "axios";

export default function useWrappedRequest() {
    const [loading, setLoading] = useState(false)
    const { setError } = useContext(AppContext)

    const wrappedRequest = useCallback(
        async <TData extends any = void>(promise: () => Promise<AxiosResponse<TData, any>>): Promise< AxiosResponse<TData, any> | null> => {
            try {
                setLoading(true)
                const result = await promise()
                return result
            } catch(error) {    
                setError(error as string)
                return null
            } finally {
                setLoading(false)
            }
        },
        [setError]
    )

    return { loading, wrappedRequest }
}
