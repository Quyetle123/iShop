import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderStatistics: {},
    orderMonth: {},
    loading: false,
    error: null,
  },
  reducers: {
    addOrderStart(state) {
      state.loading = true;
      state.error = null;
    },
    addOrderSuccess(state, action) {
      (state.loading = false), state.orders.push(action.payload);
      state.error = null;
    },
    addOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getOrderStart(state) {
      state.loading = true;
      state.error = null;
    },
    getOrderSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },
    getOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getAllOrderStart(state) {
      state.loading = true;
      state.error = null;
    },
    getAllOrderSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },
    getAllOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateStatusStart(state) {
      state.loading = false;
      state.error = null;
    },
    updateStatusSuccess(state) {
      state.loading = false;
    },
    updateStatusFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    orderStatisticStart(state) {
      state.loading = true;
      state.error = null;
    },
    orderStatisticSuccess(state, action) {
      state.loading = false;
      state.orderStatistics = action.payload;
      state.error = null;
    },
    orderStatisticFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    orderMonthStart(state) {
      state.loading = true;
      state.error = null;
    },
    orderMonthSuccess(state, action) {
      state.loading = false;
      state.orderMonth = action.payload;
      state.error = null;
    },
    orderMonthFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  addOrderStart,
  addOrderSuccess,
  addOrderFailure,
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  getAllOrderStart,
  getAllOrderSuccess,
  getAllOrderFailure,
  updateStatusStart,
  updateStatusSuccess,
  updateStatusFailure,
  orderStatisticStart,
  orderStatisticSuccess,
  orderStatisticFailure,
  orderMonthStart,
  orderMonthSuccess,
  orderMonthFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
