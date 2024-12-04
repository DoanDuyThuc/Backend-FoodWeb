import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    restaurants: [],
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setListRestaurants: (state, action) => {
            state.restaurants = action.payload
        }
    },
})

export const { setListRestaurants } = productsSlice.actions

export default productsSlice.reducer