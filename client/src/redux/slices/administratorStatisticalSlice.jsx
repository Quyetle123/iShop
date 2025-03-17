import { createSlice } from "@reduxjs/toolkit";

const administratorStatisticalSlice = createSlice({
  name: "administratorStatistical",
  initialState: {
    generalStatisticals: {},
    orderStaticMonth: {},
    loading: false,
    error: null,
  },
  reducers: {
    fetchGeneralStatisticalStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGeneralStatisticalSuccess(state, action) {
      state.generalStatisticals = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchGeneralStatisticalFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOrderStatisticMonthStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrderStatisticMonthSuccess(state, action) {
      state.orderStaticMonth = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchOrderStatisticMonthFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchGeneralStatisticalStart,
  fetchGeneralStatisticalSuccess,
  fetchGeneralStatisticalFailure,
  fetchOrderStatisticMonthStart,
  fetchOrderStatisticMonthSuccess,
  fetchOrderStatisticMonthFailure,
} = administratorStatisticalSlice.actions;

export default administratorStatisticalSlice.reducer;
