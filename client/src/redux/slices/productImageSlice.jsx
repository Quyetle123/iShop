import { createSlice } from "@reduxjs/toolkit";

const productImageSlice = createSlice({
  name: "productImages",
  initialState: {
    productImages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addProductImageStart(state) {
      state.loading = true;
      state.error = null;
    },
    addProductImageSuccess(state, action) {
      state.loading = false;
      state.productImages.push(action.payload);
      state.error = null;
    },
    addProductImageFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addProductImageStart,
  addProductImageSuccess,
  addProductImageFailure,
} = productImageSlice.actions;

export default productImageSlice.reducer;
