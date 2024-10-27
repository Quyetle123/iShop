import { createSlice } from "@reduxjs/toolkit";

const notifySlice = createSlice({
    name: "notify",
    initialState: {
        notifies: [],
        loading: false,
        error: null
    },
    reducers: {
        fetchNotifyStart(state) {
            state.loading = true;
            state.error = null
        },
        fetchNotifySuccess(state, action) {
            state.loading = false;
            state.notifies = action.payload;
            state.error = null
        },
        fetchNotifyFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteNotifyStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteNotifySuccess(state) {
            state.loading = false
        },
        deleteNotifyFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {
    fetchNotifyStart,
    fetchNotifySuccess,
    fetchNotifyFailure,
    deleteNotifyStart,
    deleteNotifySuccess,
    deleteNotifyFailure
} = notifySlice.actions;

export default notifySlice.reducer;