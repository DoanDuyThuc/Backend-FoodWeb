import { configureStore } from '@reduxjs/toolkit'
import authReducer from './AuthSlice/AuthSlice'
import productsReducer from './ProductsSlice/ProductsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
    },
})