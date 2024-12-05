import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    restaurants: [],
    foods: [],
    carts: [],
    foodItem: {
        foodName: '',
        foodDescription: '',
        foodPrice: '',
        kindOfFood: '',
        url: '',
        resTauRantName: '',
        address: '',
        restaurantId: '',
        foodId: '',
        numberphone: '',
        foodQuality: 1,
    },
}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurants: (state, action) => {
            state.restaurants = action.payload;
        },
        setFoods: (state, action) => {
            state.foods = action.payload;
        },
        setCards: (state, action) => {
            state.carts = action.payload;
        },
        setFoodItem: (state, action) => {
            state.foodItem = { ...action.payload };
            state.foodItem.foodQuality = 1;
        },
        AddQuality: (state) => {
            state.foodItem.foodQuality += 1;
        },
        RemoveQuality: (state) => {
            state.foodItem.foodQuality -= 1;
        },
    },
})

export const { setRestaurants, setFoods, setFoodItem, AddQuality, RemoveQuality, setCards } = restaurantSlice.actions

export default restaurantSlice.reducer