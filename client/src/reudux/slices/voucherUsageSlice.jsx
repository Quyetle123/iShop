import { createSlice } from "@reduxjs/toolkit";

const voucherUsageSlice = createSlice({
  name: "voucherUsages",
  initialState: {
    voucherUsages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addVoucherUsageStart(state) {
      state.loading = true;
      state.error = null;
    },
    addVoucherUsageSuccess(state, action) {
      state.loading = false;
      state.voucherUsages.push(action.payload);
      state.error = null;
    },
    addVoucherUsageError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addVoucherUsageStart,
  addVoucherUsageSuccess,
  addVoucherUsageError,
} = voucherUsageSlice.actions;

export default voucherUsageSlice.reducer;
