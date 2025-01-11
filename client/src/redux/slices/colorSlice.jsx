import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
    name: "colors",
    initialState: {
        colors: [],
        loading: false,
        error: null
    },
    reducers: {
        addColorStart(state) {
            state.loading = true;
            state.error = null;
        },
        addColorSuccess(state, action) {
            state.loading = false;
            state.colors.push(action.payload);
            state.error = null;
        },
        addColorFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getAllColorStart(state) {
            state.loading = true;
            state.error = null;
        },
        getAllColorSuccess(state, action) {
            state.loading = false;
            state.colors = action.payload;
        },
        getAllColorFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    addColorStart,
    addColorSuccess,
    addColorFailure,
    getAllColorStart,
    getAllColorSuccess,
    getAllColorFailure
} = colorSlice.actions;

export default colorSlice.reducer;