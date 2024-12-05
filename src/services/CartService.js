import { axiosInstance } from "../config/axiosInstance";

export const CreateCartService = async ({ userId }) => {

    try {
        const response = await axiosInstance.post(`/api/cart`, { userId },
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetCartIdService = async ({ cartId }) => {

    try {
        const response = await axiosInstance.get(`/api/cart/user/${cartId}`,
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const CreateCartItemService = async ({ quantity, foodId, cartId }) => {

    try {
        const response = await axiosInstance.post(`/api/cartItem`, { quantity, foodId, cartId },
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const UpdateQualityCartItemService = async ({ quantity, cartItemId }) => {

    try {
        const response = await axiosInstance.put(`/api/cartItem/${cartItemId}`, { quantity },
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const DeleteCartItemService = async ({ cartItemId }) => {

    try {
        const response = await axiosInstance.delete(`/api/cartItem/${cartItemId}`,
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const AddOrderService = async ({ userId, OrderNumber, OrderPrice, OrderStatus, Localtion }) => {

    try {
        const response = await axiosInstance.post(`/api/user/order`, { userId, OrderNumber, OrderPrice, OrderStatus, Localtion },
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const DeleteAllCartService = async ({ cartId }) => {

    try {
        const response = await axiosInstance.delete(`/api/cart/${cartId}`,
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}