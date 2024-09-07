import { setActiveMenu } from '@/actions/menuSlice'
import { useEffect } from 'react'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import type { AppDispatch, RootState } from '../state/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSetActiveMenu = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch(setActiveMenu({ path: location.pathname }));
    }, []);

    return [location];
};