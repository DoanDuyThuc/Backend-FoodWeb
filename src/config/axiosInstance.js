import axios from "axios";

export const API_URL = process.env.REACT_APP_DB_HOST;

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});