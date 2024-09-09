import { signOut } from '@/app/state/authSlice';
import api from '@/app/api/apiConfig';
import { useAppDispatch, useAppSelector } from '@/app/function/hooks';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

interface UseMutationResponse<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null | string;
    controller: any,
    isSuccssfull: boolean
}

type UseMutationHook<T> = [
    (data?: any, url?: string, config?: AxiosRequestConfig) => Promise<void>,
    UseMutationResponse<T>,
];

export default function useMutation<T>(url: string, config?: AxiosRequestConfig): UseMutationHook<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null | string>(null);
    const [isSuccssfull, setIsSuccessfull] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    const auth = useAppSelector(state => state.auth);

    useEffect(() => {
        if (abortController.signal.aborted == true) {
            regenerateCancelToken();
        }
    }, [abortController.signal.aborted])

    const regenerateCancelToken = () => {
        setAbortController(new AbortController());
    }

    const fetchData: any = async (requestData: any, _url?: string): Promise<any> => {
        const URL = _url != undefined || _url != null ? _url : url;
        setIsLoading(true);
        setError(null);
        try {
            const response: AxiosResponse<T> = await api.v1({ headers: { Authorization: `Bearer ${auth.token}` }, ...config, signal: abortController.signal, url: URL, data: requestData });
            setData(response.data);
            setIsLoading(false);
            setIsSuccessfull(true);
            return new Promise((resolve: any) => resolve(response));
        } catch (error: any) {
            console.log(error);
            setIsLoading(false);
            if (error.response) {
                if (error.response.status == 403) {

                }
                if (error.response.status == 401) {
                    return dispatch(signOut());
                }
            } else if (error.request) {
            } else {

            }
        }
    };
    return [fetchData, { data, isLoading, error, controller: abortController, isSuccssfull }];
}

