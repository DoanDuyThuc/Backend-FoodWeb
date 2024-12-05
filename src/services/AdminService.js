import { axiosInstance } from "../config/axiosInstance";


export const CreateRestaurantService = async ({ token, data }) => {

    try {
        const response = await axiosInstance.post(`/api/uploadRestaurant/upload`, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const DeleteRestaurantService = async ({ token, id }) => {

    try {
        const response = await axiosInstance.delete(`/api/uploadRestaurant/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const UpdateRestaurantService = async ({ token, data, id }) => {

    try {
        const response = await axiosInstance.put(`/api/uploadRestaurant/${id}`, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const UpdateFoodService = async ({ token, data, id }) => {

    try {
        const response = await axiosInstance.put(`/api/uploadFood/${id}`, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetAllUserService = async ({ token }) => {

    try {
        const response = await axiosInstance.get(`/api/users`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const DeleteUserService = async ({ token, id }) => {

    try {
        const response = await axiosInstance.delete(`/api/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const UpdateStatusOrderService = async ({ orderId, OrderStatus }) => {

    try {
        const response = await axiosInstance.put(`/api/user/order/${orderId}`, { OrderStatus },
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}