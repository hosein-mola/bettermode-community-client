import { signOut } from '@/app/states/authSlice';
import api from '@/app/api/apiConfig';
import { delay } from '@/app/function/delay';
import { useAppDispatch, useAppSelector } from '@/app/function/hooks';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

interface useQueryResponse {
    data: any;
    isLoading: boolean;
    error: any;
    setData: any,
    fetch: any,
    setIsLoading: any,
    authorized: boolean,
    hasContent: boolean
}

type useQueryHook<T> = [
    useQueryResponse
];

export default function useQuery<T>(initialUrl: string): useQueryResponse {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [authorized, setAuthorized] = useState(true);
    const [hasContent, setHasContent] = useState(false);
    const [error, setError] = useState<String | null>(null);
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const fetch = async (_url?: string, config?: AxiosRequestConfig,) => {
        setError(null);
        const URL = _url != undefined || _url != null ? _url : initialUrl;
        return new Promise(async (resolve, reject) => {
            setIsLoading(true);
            try {
                const response: AxiosResponse<T> = await api.v1({ ...config, headers: { "Authorization": `Bearer ${auth.token}`, 'Content-Type': 'application/json' }, method: "GET", url: '/' + URL });
                setIsLoading(false);
                setData(response?.data);
                resolve(response);
            } catch (error: any) {
                setIsLoading(false);
                if (error.response) {
                    if (error.response.status == 404) {
                        setError("آدرس مورد نظر وجود ندارد");
                    }
                    if (error.response.status == 403) {
                        setAuthorized(false);
                    }
                    if (error.response.status == 401) {
                        setAuthorized(false);
                        dispatch(signOut());
                    }
                } else if (error.request) {
                    setError("لطفا وضعیت اینترنت یا شبکه خود را بررسی کنید");
                } else {
                    setError("خطایی رخ داده است لطفا با پشتیبانی تماس بگیرید");
                }
                reject(error);
            }
        });
    };

    return { data, isLoading, error, authorized, hasContent, setData, fetch, setIsLoading };
}
