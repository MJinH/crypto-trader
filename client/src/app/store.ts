import { configureStore } from '@reduxjs/toolkit'
import cacheReducer from './context/CacheSlice'

export const store = configureStore({
    reducer: {
        cache: cacheReducer
    }
})