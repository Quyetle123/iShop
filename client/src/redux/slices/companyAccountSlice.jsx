import { createSlice } from '@reduxjs/toolkit';

const companyAccountSlice = createSlice({
    name: 'companyAccounts',
    initialState: {
        companyAccount: null,
        loading: false,
        error: null,
    },
    reducers: {
        fetchCompanyAccountStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCompanyAccountSuccess: (state, action) => {
            state.loading = false;
            state.companyAccount = action.payload;
            state.error = null;
        },
        fetchCompanyAccountError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchCompanyAccountStart, fetchCompanyAccountSuccess, fetchCompanyAccountError } =
    companyAccountSlice.actions;

export default companyAccountSlice.reducer;
