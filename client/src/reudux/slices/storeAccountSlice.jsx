import { createSlice } from "@reduxjs/toolkit";

const storeAccountSlice = createSlice({
  name: "storeAccounts",
  initialState: {
    storeAccounts: [],
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
  },
});

export const {
  addStoreAccountStart,
  addStoreAccountSuccess,
  addStoreAccountFailure,
} = storeAccountSlice.actions;

export default storeAccountSlice.reducer;
