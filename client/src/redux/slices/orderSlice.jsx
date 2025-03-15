import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderById: null,
    orderStatus: [],
    orderDraft: {},
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
    getOrderByIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    getOrderByIdSuccess(state, action) {
      state.loading = false;
      state.orderById = action.payload;
      state.error = null;
    },
    getOrderByIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getOrderStatusStart(state) {
      state.loading = true;
      state.error = null;
    },
    getOrderStatusSuccess(state, action) {
      state.loading = false;
      state.orderStatus = action.payload;
      state.error = null;
    },
    getOrderStatusFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getOrderDraftStart(state) {
      state.loading = true;
      state.error = null;
    },
    getOrderDraftSuccess(state, action) {
      state.loading = false;
      state.orderDraft = action.payload;
      state.error = null;
    },
    getOrderDraftFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    newOrderStart(state) {
      state.loading = true;
      state.error = null;
    },
    newOrderSuccess(state) {
      state.loading = false;
    },
    newOrderFailure(state, action) {
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
  getOrderByIdStart,
  getOrderByIdSuccess,
  getOrderByIdFailure,
  getOrderStatusStart,
  getOrderStatusSuccess,
  getOrderStatusFailure,
  getOrderDraftStart,
  getOrderDraftSuccess,
  getOrderDraftFailure,
  newOrderStart,
  newOrderSuccess,
  newOrderFailure,
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
