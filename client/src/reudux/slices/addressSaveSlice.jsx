import { createSlice } from "@reduxjs/toolkit";

const addressSaveSlice = createSlice({
    name: "addressSaves",
    initialState: {
        addressSaves: [],
        loading: false,
        error: null,
    },
    reducers: {
        addAddressSaveStart(state) {
            state.loading = true;
            state.error = null;
        },
        addAddressSaveSuccess(state, action) {
            state.loading = false;
            state.posts.push(action.payload);
            state.error = null;
        },
        addAddressSaveError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchAddressSavesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchAddressSavesSuccess(state, action) {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchAddressSavesError(state, action) {
            state.loading = true;
            state.error = action.payload;
        },
        fetchAddressSaveByIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchAddressSaveByIdSuccess(state, action) {
            state.loading = false;
            state.selectedAddressSave = action.payload; 
        },
        fetchAddressSaveByIdError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateAddressSaveStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateAddressSaveSuccsess(state) {
            state.loading = false;
        },
        updateAddressSaveError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteAddressSveStart(state) {
            state.loading = true;
        },
        deleteAddressSaveSucess(state) {
            state.loading = false;
        },
        deleteAddressSaveError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    addAddressSaveStart,
    addAddressSaveSuccess,
    addAddressSaveError,
    fetchAddressSavesStart,
    fetchAddressSavesSuccess, 
    fetchAddressSavesError,
    fetchAddressSaveByIdStart,
    fetchAddressSaveByIdSuccess,
    fetchAddressSaveByIdError,
    updateAddressSaveStart,
    updateAddressSaveSuccsess,
    updateAddressSaveError,
    deleteAddressSveStart,
    deleteAddressSaveSucess,
    deleteAddressSaveError,
} = addressSaveSlice.actions;

export default addressSaveSlice.reducer;