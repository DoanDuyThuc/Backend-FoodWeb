import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    carts: [],
    totalPriceCart: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCards: (state, action) => {
            state.carts = action.payload;
            state.totalPriceCart = action.payload.reduce((total, item) => total + (item.foodPrice * item.quantity), 0);
        },
        resetCart: (state) => {
            state.carts = [];
            state.totalPriceCart = 0;
        }

    },
})

export const { setCards, resetCart } = cartSlice.actions

export default cartSlice.reducer