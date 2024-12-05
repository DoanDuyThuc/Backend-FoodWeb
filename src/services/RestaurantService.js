import { axiosInstance } from "../config/axiosInstance";

export const GetAllRestaurantService = async () => {

    try {
        const response = await axiosInstance.get(`/useradmin`,
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetRestaurantIdService = async ({ id }) => {

    try {
        const response = await axiosInstance.get(`/useradmin/${id}`,
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const CreateFoodService = async ({ token, data }) => {

    try {
        const response = await axiosInstance.post(`/api/uploadFood/uploadfood`, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const DeleteFoodService = async ({ token, FoodId }) => {

    try {
        const response = await axiosInstance.delete(`/api/uploadFood/${FoodId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetAllFoodService = async () => {

    try {
        const response = await axiosInstance.get(`/useradminfood`,
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetFoodIdService = async ({ id }) => {

    try {
        const response = await axiosInstance.get(`/useradminfood/${id}`,
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}