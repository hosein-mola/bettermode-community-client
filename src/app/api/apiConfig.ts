import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const LOCAL = "https://localhost:7110/api/v1/";
const STAGE = "http://198.0.0.1:9111/api/v1/";

interface Axios {
    v1: AxiosInstance,
}

const api: Axios = {
    v1: axios.create({
        baseURL: STAGE,
        timeout: 0.000000001,
        headers: {
            "Accept": "*/*",
            'Content-Type': 'application/json',
        },
    }),
};

const onSuccess = (response: AxiosResponse) => {
    return response;
};

const onError = (error: AxiosError) => {
    return Promise.reject(error);
};

api.v1.interceptors.response.use(onSuccess, onError);


export default api;