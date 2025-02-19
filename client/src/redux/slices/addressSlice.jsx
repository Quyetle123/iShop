import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    provinces: [],
    districts: [],
    wards: [],
    mainAddress: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchProvincesStart(state) {
      state.provinces = true;
      state.error = null;
    },
    fetchProvincesSuccess(state, action) {
      state.loading = false;
      state.provinces = action.payload;
      state.error = null;
    },
    fetchProvincesError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchDistrictsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDistrictsSuccess(state, action) {
      state.loading = false;
      state.districts = action.payload;
      state.error = null;
    },
    fetchDistrictsError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchWardsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWardsSuccess(state, action) {
      state.loading = false;
      state.wards = action.payload;
      state.error = null;
    },
    fetchWardsError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMainAddressStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMainAddressSuccess(state, action) {
      state.loading = false;
      state.mainAddress = action.payload;
      state.error = null;
    },
    fetchMainAddressError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProvincesStart,
  fetchProvincesSuccess,
  fetchProvincesError,
  fetchDistrictsStart,
  fetchDistrictsSuccess,
  fetchDistrictsError,
  fetchWardsStart,
  fetchWardsSuccess,
  fetchWardsError,
  fetchMainAddressStart,
  fetchMainAddressSuccess,
  fetchMainAddressError
} = addressSlice.actions;
export default addressSlice.reducer;
