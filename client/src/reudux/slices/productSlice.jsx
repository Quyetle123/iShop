import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productes",
  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    addProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess(state, action) {
      state.loading = false;
      state.products.push(action.payload);
      state.error = null;
    },
    fetchProductesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductesSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductByIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductByIdSuccess(state, action) {
      state.loading = false;
      state.selectedProduct = action.payload;
    },
    fetchProductByCateIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductByCateIdSuccess(state, action) {
      state.loading = false;
      state.products = action.payload
    },
    updateProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      const index = state.products.filter((pd) => pd.id === action.payload.id);
      state.products[index] = action.payload;
    },
    deleteProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess(state) {
      state.loading = false;
    },
    productError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addProductStart,
  addProductSuccess,
  fetchProductesStart,
  fetchProductesSuccess,
  fetchProductByIdStart,
  fetchProductByIdSuccess,
  fetchProductByCateIdStart,
  fetchProductByCateIdSuccess,
  updateProductStart,
  updateProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  productError,
} = productSlice.actions;

export default productSlice.reducer;
