import { createSlice } from "@reduxjs/toolkit";

const locationStoreSlice = createSlice({
  name: "locationStores",
  initialState: {
    locationStores: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchLocationStoreStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLocationStoreSuccess: (state, action) => {
      state.loading = false;
      state.locationStores = action.payload;
    },
    fetchLocationStoreError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchLocationStoreStart,
  fetchLocationStoreSuccess,
  fetchLocationStoreError,
} = locationStoreSlice.actions;

export default locationStoreSlice.reducer;
