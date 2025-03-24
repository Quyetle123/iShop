import { createSlice } from '@reduxjs/toolkit';

const postSilce = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        selectedPost: null,
        loading: false,
        error: null,
    },
    reducers: {
        addPostStart(state) {
            state.loading = true;
            state.error = null;
        },
        addPostSuccess(state, action) {
            state.loading = false;
            state.posts.push(action.payload);
            state.error = null;
        },
        addPostError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchPostsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess(state, action) {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostsError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchPostByIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPostByIdSuccess(state, action) {
            state.loading = false;
            state.selectedPost = action.payload;
        },
        fetchPostByIdError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updatePostStart(state) {
            state.loading = true;
            state.error = null;
        },
        updatePostSuccess(state) {
            state.loading = false;
        },
        updatePostError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deletePostStart(state) {
            state.loading = true;
        },
        deletePostSuccess(state) {
            state.loading = false;
        },
        deletePostError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    addPostStart,
    addPostSuccess,
    addPostError,
    fetchPostsStart,
    fetchPostsSuccess,
    fetchPostsError,
    fetchPostByIdStart,
    fetchPostByIdSuccess,
    fetchPostByIdError,
    updatePostStart,
    updatePostSuccess,
    updatePostError,
    deletePostStart,
    deletePostSuccess,
    deletePostError,
} = postSilce.actions;

export default postSilce.reducer;
