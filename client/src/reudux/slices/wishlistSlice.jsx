import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlists",
    initialState: {
        wishlists: [],
        loading: false,
        error: null,
    },
    reducers: {
        addWishlistStart(state) {
            state.loading = true;
            state.error = null;
        },
        addWishlistSuccess(state, action) {
            state.loading = false;
            state.wishlists.push(action.payload);
            state.error = null;
        },
        addWishlistError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchWishlistByAccountidStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchWishlistByAccountidSuccess(state, action) {
            state.loading = false;
            state.wishlists = action.payload;
            state.error = null;
        },
        fetchWishlistByAccountidError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteWishlistStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteWishlistSuccess(state) {
            state.loading = false;
        },
        deleteWishlistError(state, action) {
            state.loading = false;
            state.error = action.paload;
        },
    },
});

export const {
    addWishlistStart,
    addWishlistSuccess,
    addWishlistError,
    fetchWishlistByAccountidStart,
    fetchWishlistByAccountidSuccess,
    fetchWishlistByAccountidError,
    deleteWishlistStart,
    deleteWishlistSuccess,
    deleteWishlistError
} = wishlistSlice.actions;

export default wishlistSlice.reducer;