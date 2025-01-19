import { createSlice } from "@reduxjs/toolkit";

const voucherProductSlice = createSlice({
  name: "voucherProducts",
  initialState: {
    voucherProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    addVoucherProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    addVoucherProductSuccess(state, action) {
      state.loading = false;
      state.voucherProducts.push(action.payload);
      state.error = null;
    },
    addVoucherProductError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addVoucherProductStart,
  addVoucherProductSuccess,
  addVoucherProductError,
} = voucherProductSlice.actions;
export default voucherProductSlice.reducer;
