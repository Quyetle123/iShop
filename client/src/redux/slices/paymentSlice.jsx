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
        updateInfoPaymentSatrt(state) {
            state.loading = true;
            state.error = null;
        },
        updateInfoPaymentSuccess(state) {
            state.loading = false;
            state.error = null;
        },
        updateInfoPaymentError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    addPaymentStart,
    addPaymentSuccess,
    addPaymentError,
    updateInfoPaymentSatrt,
    updateInfoPaymentSuccess,
    updateInfoPaymentError,
} = paymentSlice.actions;

export default paymentSlice.reducer;
