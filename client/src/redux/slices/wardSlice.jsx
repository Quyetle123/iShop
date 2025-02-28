import { createSlice } from "@reduxjs/toolkit";

const wardSlice = createSlice({
  name: "wards",
  initialState: {
    wards: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchWardsByDistrictIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWardsByDistrictIdSuccess(state, action) {
      state.loading = false;
      state.wards = action.payload;
      state.error = null;
    },
    fetchWardsByDistrictIdError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchWardsByDistrictIdStart,
  fetchWardsByDistrictIdSuccess,
  fetchWardsByDistrictIdError,
} = wardSlice.actions;

export default wardSlice.reducer;