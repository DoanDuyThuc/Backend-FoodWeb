import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.token = action.payload;
        }
    },
})

export const { setUserInfo } = authSlice.actions

export default authSlice.reducer