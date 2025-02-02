import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        account: null,
        accounts: [],
        role: null,
        token: null,
        isLoading: false,
        error: null       
    },
    reducers: {
        registerStart(state) {
            state.isLoading = true;
        },
        registerSuccess(state, action) {
            state.isLoading = false,
            state.account = action.payload.account,
            state.token = action.payload.token,
            state.error = null
        },
        registerFailure(state, action) {
            state.isLoading = false,
            state.error = action.payload
        },
        loginStart(state) {
            state.isLoading = true;
        },
        loginSuccess(state, action) {
            state.isLoading = false,
            state.account = action.payload.account,
            state.token = action.payload.token,
            state.role = action.payload.role;
            state.error = null
        },
        loginFailure(state, action) {
            state.isLoading = false,
            state.error = action.payload
        },
        loginWithGoogleStart(state) {
            state.isLoading = true;
        },
        loginWithGoogleSuccess(state, action) {
            state.isLoading = false,
            state.account = action.payload.account,
            state.token = action.payload.token,
            state.role = action.payload.role;
            state.error = null
        },
        loginWithGoogleFailure(state, action) {
            state.isLoading = false,
            state.error = action.payload
        },
        logoutStart(state) {
            state.isloading = false
        },
        logoutSuccess(state) {
            state.isLoading = false,
            state.account = null
            state.token = null
            state.role = null
            state.error = null
        },
        logoutFailure(state, action) {
            state.isLoading = false,
            state.error = action.payload
        },
        fetchAccountsStart(state) {
            state.loading = true;
            state.error = null
        },
        fetchAccountsSuccess(state, action) {
            state.loading = false;
            state.accounts = action.payload;
        },
        fetchAccountFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    } 
})

export const {
    registerStart,
    registerSuccess,
    registerFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    fetchAccountsStart,
    fetchAccountsSuccess,
    fetchAccountFailure,
    loginWithGoogleStart,
    loginWithGoogleSuccess,
    loginWithGoogleFailure
} = authSlice.actions

export default authSlice.reducer