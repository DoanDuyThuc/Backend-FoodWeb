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

export const GetAllRestaurantService = async ({ token }) => {

    try {
        const response = await axiosInstance.get(`/api/uploadRestaurant`,
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

export const GetRestaurantIdService = async ({ token, id }) => {

    try {
        const response = await axiosInstance.get(`/api/uploadRestaurant/${id}`,
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