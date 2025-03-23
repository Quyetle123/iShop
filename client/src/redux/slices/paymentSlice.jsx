import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    payments: [],
    loading: false,
    error: null,
  },
  reducers: {
    addPaymentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addPaymentSuccess: (state, action) => {
      state.loading = false;
      state.payments.push(action.payload);
      state.error = null;
    },
    addPaymentError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addPaymentStart, addPaymentSuccess, addPaymentError } =
  paymentSlice.actions;

export default paymentSlice.reducer;
