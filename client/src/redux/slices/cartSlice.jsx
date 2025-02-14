import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
    loading: false,
    error: null,
  },
  reducers: {
    addCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    addCartSuccess(state, action) {
      state.loading = false;
      state.carts.push(action.payload);
      state.error = null;
    },
    addCartError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCartByAccountidStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCartByAccountidSuccess(state, action) {
      state.loading = false;
      state.carts = action.payload;
      state.error = null;
    },
    fetchCartByAccountidError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateQuantityStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateQuantitySuccess(state) {
      state.loading = false;
    },
    updateQuantityError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteCartSucess(state) {
      state.loading = false;
    },
    deleteCartError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addCartStart,
  addCartSuccess,
  addCartError,
  fetchCartByAccountidStart,
  fetchCartByAccountidSuccess,
  fetchCartByAccountidError,
  updateQuantityStart,
  updateQuantitySuccess,
  updateQuantityError,
  deleteCartStart,
  deleteCartSucess,
  deleteCartError
} = cartSlice.actions;

export default cartSlice.reducer;
