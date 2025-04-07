import { createSlice } from '@reduxjs/toolkit';

const storeStockSlice = createSlice({
    name: 'storeStocks',
    initialState: {
        initializeStoreStock: null,
        storeStocks: [],
        productStatics: {},
        loading: false,
        error: null,
    },
    reducers: {
        initializeStoreStockStart(state) {
            state.loading = true;
            state.error = null;
        },
        initializeStoreStockSuccess(state, action) {
            state.initializeStoreStock = action.payload;
            state.loading = false;
            state.error = null;
        },
        initializeStoreStockError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateStoreStockStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateStoreStockSuccess(state) {
            state.loading = false;
            state.error = null;
        },
        updateStoreStockError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getStoreStockStart(state) {
            state.loading = true;
            state.error = null;
        },
        getStoreStockSuccess(state, action) {
            state.loading = false;
            state.storeStocks = action.payload;
            state.error = null;
        },
        getStoreStockError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateQuantityStoreStockStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateQuantityStoreStockSuccess(state) {
            state.loading = false;
            state.error = null;
        },
        updateQuantityStoreStockError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchProductStaticsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductStaticsSuccess(state, action) {
            state.loading = false;
            state.productStatics = action.payload;
            state.error = null;
        },
        fetchProductStaticsError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    initializeStoreStockStart,
    initializeStoreStockSuccess,
    initializeStoreStockError,
    getStoreStockStart,
    getStoreStockSuccess,
    getStoreStockError,
    updateQuantityStoreStockStart,
    updateQuantityStoreStockSuccess,
    updateQuantityStoreStockError,
    fetchProductStaticsStart,
    fetchProductStaticsSuccess,
    fetchProductStaticsError,
    updateStoreStockStart,
    updateStoreStockSuccess,
    updateStoreStockError,
} = storeStockSlice.actions;

export default storeStockSlice.reducer;
