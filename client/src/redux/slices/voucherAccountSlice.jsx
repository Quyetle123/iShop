import { createSlice } from "@reduxjs/toolkit";

const voucherAccountSlice = createSlice({
  name: "voucherAccounts",
  initialState: {
    voucherAccounts: [],
    loading: false,
    error: null,
  },
  reducers: {
    addVoucherAccountStart(state) {
      state.loading = true;
      state.error = null;
    },
    addVoucherAccountSuccess(state, action) {
      state.loading = false;
      state.voucherAccounts.push(action.payload);
      state.error = null;
    },
    addVoucherAccountError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addVoucherAccountStart,
  addVoucherAccountSuccess,
  addVoucherAccountError,
} = voucherAccountSlice.actions;

export default voucherAccountSlice.reducer;
