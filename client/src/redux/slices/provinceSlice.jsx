import { createSlice } from "@reduxjs/toolkit";

const provinceSlice = createSlice({
  name: "province",
  initialState: {
    provinces: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProvincesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProvincesSuccess(state, action) {
      state.loading = false;
      state.provinces = action.payload;
      state.error = null;
    },
    fetchProvincesFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProvincesStart,
  fetchProvincesSuccess,
  fetchProvincesFail,
} = provinceSlice.actions;
export default provinceSlice.reducer;
