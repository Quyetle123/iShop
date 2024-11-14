import { createSlice } from "@reduxjs/toolkit";

const productColorSlice = createSlice({
  name: "productColors",
  initialState: {
    productColors: [],
    loading: false,
    error: null,
  },
  reducers: {
    addProductColorStart(state) {
      state.loading = true;
      state.error = null;
    },
    addProductColorSuccess(state, action) {
      state.loading = false;
      state.productColors.push(action.payload);
      state.error = null;
    },
    addProductColorFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addProductColorStart,
  addProductColorSuccess,
  addProductColorFailure,
} = productColorSlice.actions;

export default productColorSlice.reducer;
