import { createSlice } from '@reduxjs/toolkit';

interface InitState {
    isLoggedIn: boolean
    token: string,
    member: Record<string, string>,
}

const _initialState: InitState = {
    isLoggedIn: false,
    token: '',
    member: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: _initialState,
    reducers: {
        signIn: (state, action) => {
            const { accessToken, member } = action.payload;
            state.isLoggedIn = true;
            state.member = member;
            state.token = accessToken;
        },
        signOut: (state) => {
            state.isLoggedIn = false;
            state.token = "";
            state.member = {};
        },
    }
});

// this is for dispatch
export const { signIn, signOut } = authSlice.actions;

// this is for configureStore
export default authSlice.reducer;
