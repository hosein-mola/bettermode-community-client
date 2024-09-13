import {createSlice} from "@reduxjs/toolkit";

interface InitState {
    posts: any[];
    spaces: any[];
    selectedSpace: string;
    offset: number;
    limit: number;
    hasFetched: boolean;
}

const _initialState: InitState = {
    posts: [],
    spaces: [],
    selectedSpace: "",
    offset: 0,
    limit: 3,
    hasFetched: false,
};

export const authSlice = createSlice({
    name: "posts",
    initialState: _initialState,
    reducers: {
        setSelectedSpace: (state, action) => {
            const {selectedSpace} = action.payload;
            state.selectedSpace = selectedSpace;
            state.posts = [];
            state.offset = 0;
            state.limit = 3;
            state.hasFetched = false;
        },
        mergePosts(state, action) {
            const {posts} = action.payload;
            const mergedPosts = [...state.posts, ...posts];
            state.posts = mergedPosts;
            state.hasFetched = true;
        },
        setPosts(state, action) {
            const {posts} = action.payload;
            state.posts = posts;
        },
        setSpace(state, action) {
            const {spaces} = action.payload;
            state.spaces = spaces;
        },
        setOffset(state, action) {
            const {offset} = action.payload;
            state.offset = offset;
            state.hasFetched = false;
        },
    },
});

// this is for dispatch
export const {setSelectedSpace, setSpace, mergePosts, setPosts, setOffset} = authSlice.actions;

// this is for configureStore
export default authSlice.reducer;
