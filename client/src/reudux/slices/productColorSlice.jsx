import { createSlice } from "@reduxjs/toolkit";

const productColorSlice = createSlice({
  name: "productColors",
  initialState: {
    productColors: [],
    productColor: null,
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
    fetchProductColorsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductColorsSuccess(state, action) {
      state.loading = false;
      state.productColors = action.payload;
      state.error = null;
    },
    fetchProductColorsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductColorByIdStart(state) {
      state.loading = false;
      state.error = null
    },
    fetchProductColorByIdSuccess(state, action) {
      state.loading = false;
      state.productColor = action.payload;
    },
    fetchProductColorByIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  addProductColorStart,
  addProductColorSuccess,
  addProductColorFailure,
  fetchProductColorsStart,
  fetchProductColorsSuccess,
  fetchProductColorsFailure,
  fetchProductColorByIdStart,
  fetchProductColorByIdSuccess,
  fetchProductColorByIdFailure
} = productColorSlice.actions;

export default productColorSlice.reducer;
