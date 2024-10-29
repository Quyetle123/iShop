import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "stores",
  initialState: {
    stores: [],
    loading: false,
    error: null,
  },
  reducers: {
    addStoreStart(state) {
      state.loading = true;
      state.error = false;
    },
    addStoreSuccess(state, action) {
      state.loading = false;
      state.stores.push(action.payload);
      state.error = null;
    },
    addStoreFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addStoreStart, addStoreSuccess, addStoreFailure } =
  storeSlice.actions;

export default storeSlice.reducer
