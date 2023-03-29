import { createSlice } from "@reduxjs/toolkit";

const CacheSlice = createSlice({
    name: "cache",
    initialState: {
        cache: new Map<string, string>()
    },
    reducers: {
        setCache: (state, { payload }) => {

        },
        clearCache: (state, { payload }) => {

        }
    }
})

export const { setCache, clearCache } = CacheSlice.actions
export default CacheSlice.reducer