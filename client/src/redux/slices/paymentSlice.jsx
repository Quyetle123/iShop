import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
    name: 'payments',
    initialState: {
        payments: [],
        vnPay: null,
        momoPay: null,
        loading: false,
        error: null,
    },
    reducers: {
        addPaymentStart(state) {
            state.loading = true;
            state.error = null;
        },
        addPaymentSuccess(state, action) {
            state.loading = false;
            state.payments.push(action.payload);
            state.error = null;
        },
        addPaymentError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchVNPayStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchVNPaysSuccess(state, action) {
            state.loading = false;
            state.vnPay = action.payload;
        },
        fetchVNPaysError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchMomoPayStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchMomoPaySuccess(state, action) {
            state.loading = false;
            state.momoPay = action.payload;
        },
        fetchMomoPayError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    addPaymentStart,
    addPaymentSuccess,
    addPaymentError,
    fetchVNPayStart,
    fetchVNPaysSuccess,
    fetchVNPaysError,
    fetchMomoPayStart,
    fetchMomoPaySuccess,
    fetchMomoPayError,
} = paymentSlice.actions;

export default paymentSlice.reducer;
