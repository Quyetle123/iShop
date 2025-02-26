import { createSlice } from "@reduxjs/toolkit";

const storeAccountSlice = createSlice({
  name: "storeAccounts",
  initialState: {
    storeAccounts: [],
    storeAccount: null,
    loading: false,
    error: null,
  },
  reducers: {
    addStoreAccountStart(state) {
      state.loading = true;
      state.error = null;
    },
    addStoreAccountSuccess(state, action) {
      state.loading = false;
      state.storeAccounts.push(action.payload);
      state.error = null;
    },
    addStoreAccountFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getAccountStorebyAccountIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    getAccountStorebyAccountIdSuccess(state, action) {
      state.loading = false;
      state.storeAccount = action.payload;
      state.error = null;
    },
    getAccountStorebyAccountIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addStoreAccountStart,
  addStoreAccountSuccess,
  addStoreAccountFailure,
  getAccountStorebyAccountIdStart,
  getAccountStorebyAccountIdSuccess,
  getAccountStorebyAccountIdFailure,
} = storeAccountSlice.actions;

export default storeAccountSlice.reducer;
