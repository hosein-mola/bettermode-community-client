import { createSlice } from '@reduxjs/toolkit';

interface InitState {
    isLoggedIn: boolean
    token: string | null,
    userInfo: {
        firstName: string | null,
        lastName: string | null
    },
    userRoles: Array<String>
}

const _initialState: InitState = {
    isLoggedIn: false,
    token: null,
    userInfo: {
        firstName: null,
        lastName: null
    },
    userRoles: []
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: _initialState,
    reducers: {
        signIn: (state, action) => {
            const { result } = action.payload;

        },
        signOut: (state) => {
            state.isLoggedIn = false;
            state.token = "";
            state.userRoles = []
        },
    }
});

// this is for dispatch
export const { signIn, signOut } = authSlice.actions;

// this is for configureStore
export default authSlice.reducer;
