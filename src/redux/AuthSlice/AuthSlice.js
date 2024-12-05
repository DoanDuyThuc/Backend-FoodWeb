import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    role: 'USER',
    id: '',
    cartId: '',
    orders: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.role = action.payload.role;
            state.id = action.payload.id;
            state.cartId = action.payload.cartId;
        },
        removeUserInfo: (state) => {
            state.role = '';
            state.id = '';
            state.cartId = '';
        },
        setOrdersUser: (state, action) => {
            state.orders = action.payload;
        }
    },
})

export const { setUserInfo, removeUserInfo, setOrdersUser } = authSlice.actions

export default authSlice.reducer