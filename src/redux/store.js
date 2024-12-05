import { configureStore } from '@reduxjs/toolkit'
import authReducer from './AuthSlice/AuthSlice'
import restaurantReducer from './RestaurantSlice/RestaurantSlice'
import cartReducer from './CartSlice/CartSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurant: restaurantReducer,
        cart: cartReducer,
    },
})