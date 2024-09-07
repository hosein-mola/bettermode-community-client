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

export default function useQuery<T>(defaultValue): useQueryResponse {
    const [data, setData] = useState<any>({
        data: defaultValue
    });
    const [isLoading, setIsLoading] = useState(false);
    const [authorized, setAuthorized] = useState(true);
    const [hasContent, setHasContent] = useState(true);
    const [error, setError] = useState<String | null>(null);

    const fetch = async (_url?: string, config?: AxiosRequestConfig,) => {
        setError(null);
        return new Promise(async (resolve, reject) => {
            resolve(data);
        });
    };

    return { data, isLoading, error, authorized, hasContent, setData, fetch, setIsLoading };
}
