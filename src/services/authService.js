import { axiosInstance } from "../config/axiosInstance";



export const RegisterService = async ({ email, password, name, numberphone }) => {

    try {
        const response = await axiosInstance.post(`/auth/signup`, { email, password, name, numberphone },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const LoginService = async ({ email, password }) => {

    try {
        const response = await axiosInstance.post(`/auth/signin`, { email, password },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetMeService = async ({ token }) => {

    try {
        const response = await axiosInstance.get(`/api/users`, {},
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


export const GetOrderUserService = async ({ userId }) => {

    try {
        const response = await axiosInstance.get(`/api/user/order/useroder/${userId}`, {},
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