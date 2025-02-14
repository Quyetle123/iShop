import { createSlice } from "@reduxjs/toolkit";

const orderDetailSlice = createSlice({
  name: "orderDetails",
  initialState: {
    orderDetails: [],
    loading: false,
    error: null,
  },
  reducers: {
    addOrderDetailStart(state) {
      state.loading = true;
      state.error = null;
    },
    addOrderDetailSuccess(state, action) {
      state.loading = false;
      state.orderDetails.push(action.payload);
      state.error = null;
    },
    addOrderDetailFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addOrderDetailStart,
  addOrderDetailSuccess,
  addOrderDetailFailure,
} = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
