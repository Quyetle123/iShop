import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
    name: 'stores',
    initialState: {
        stores: [],
        store: null,
        loading: false,
        error: null,
    },
    reducers: {
        addStoreStart(state) {
            state.loading = true;
            state.error = null;
        },
        addStoreSuccess(state, action) {
            state.loading = false;
            state.stores.push(action.payload);
            state.error = null;
        },
        addStoreFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchStoreByIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchStoreByIdSuccess(state, action) {
            state.loading = false;
            state.store = action.payload;
            state.error = null;
        },
        fetchStoreByIdFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateStatusStoreStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateStatusStoreSuccess(state) {
            state.loading = false;
            state.error = null;
        },
        updateStatusStoreFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    addStoreStart,
    addStoreSuccess,
    addStoreFailure,
    fetchStoreByIdStart,
    fetchStoreByIdSuccess,
    fetchStoreByIdFailure,
    updateStatusStoreStart,
    updateStatusStoreSuccess,
    updateStatusStoreFailure,
} = storeSlice.actions;

export default storeSlice.reducer;
