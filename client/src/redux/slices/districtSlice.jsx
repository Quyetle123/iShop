import { createSlice } from "@reduxjs/toolkit";

const districtSlice = createSlice({
    name: "districts",
    initialState: {
        districts: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchDistrictByProvinceIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchDistrictByProvinceIdSuccess(state, action) {
            state.loading = false;
            state.districts = action.payload;
            state.error = null;
        },
        fetchDistrictByProvinceIdError(state, action) {
            state.loading = false;
            state.error = action.payload;
    },
}});

export const {
    fetchDistrictByProvinceIdStart,
    fetchDistrictByProvinceIdSuccess,
    fetchDistrictByProvinceIdError,
} = districtSlice.actions;

export default districtSlice.reducer;