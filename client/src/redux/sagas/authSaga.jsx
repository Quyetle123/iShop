/* eslint-disable react-hooks/rules-of-hooks */
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    fetchAccountFailure,
    fetchAccountsStart,
    fetchAccountsSuccess,
    loginFailure,
    loginStart,
    loginSuccess,
    loginWithGoogleFailure,
    loginWithGoogleStart,
    loginWithGoogleSuccess,
    registerAdminFailure,
    registerAdminStart,
    registerAdminSuccess,
    registerFailure,
    registerStart,
    registerSuccess,
    sendmailFailure,
    sendmailStart,
    sendmailSuccess,
} from '../slices/authSlice.jsx';

function* handleRegister(action) {
    try {
        const response = yield call(axios.post, `${import.meta.env.VITE_LOCALHOST}/auth/register`, action.payload);
        if (response && response.data) {
            yield put(
                registerSuccess({
                    account: response.data.account,
                    token: response.data.token,
                }),
            );
        } else {
            console.log(response);
            yield put(registerFailure('k có data'));
        }
    } catch (error) {
        yield put(registerFailure(error.response.data.message));
    }
}

function* handleRegisterAdmin(action) {
    try {
        const response = yield call(
            axios.post,
            `${import.meta.env.VITE_LOCALHOST}/auth/register-admin`,
            action.payload,
        );
        if (response && response.data) {
            yield put(
                registerAdminSuccess({
                    account: response.data.account,
                    token: response.data.token,
                }),
            );
        } else {
            console.log(response);
            yield put(registerAdminFailure('k có data'));
        }
    } catch (error) {
        yield put(registerFailure(error.response.data.message));
    }
}

function* handleLogin(action) {
    try {
        const response = yield call(axios.post, `${import.meta.env.VITE_LOCALHOST}/auth/login`, action.payload);
        if (response) {
            localStorage.setItem('token', response.data.token);
            yield put(
                loginSuccess({
                    account: response.data.account,
                    token: response.data.token,
                    role: response.data.account.role,
                }),
            );
        }
    } catch (error) {
        yield put(loginFailure(error.response.data.message));
    }
}

function* handleLoginWithGoogle(action) {
    try {
        const response = yield call(
            axios.post,
            `${import.meta.env.VITE_LOCALHOST}/auth/loginWithGoogle`,
            action.payload,
        );
        if (response) {
            localStorage.setItem('token', response.data.token);
            yield put(
                loginWithGoogleSuccess({
                    account: response.data.account,
                    token: response.data.token,
                    role: response.data.account.role,
                }),
            );
        }
    } catch (error) {
        yield put(loginWithGoogleFailure(error.response.data.message));
    }
}

function* getAccountsSaga() {
    try {
        const response = yield call(axios.get, `${import.meta.env.VITE_LOCALHOST}/auth`);
        yield put(fetchAccountsSuccess(response.data));
    } catch (error) {
        yield put(fetchAccountFailure(error.message));
    }
}

function* sendMailSaga(action) {
    try {
        const response = yield call(
            axios.post,
            `${import.meta.env.VITE_LOCALHOST}/auth/send-mail-account`,
            action.payload,
        );
        yield put(sendmailSuccess(response.data));
    } catch (error) {
        yield put(sendmailFailure(error.response.data.message));
    }
}

export default function* authSaga() {
    yield takeLatest(registerStart, handleRegister);
    yield takeLatest(loginStart, handleLogin);
    yield takeLatest(fetchAccountsStart, getAccountsSaga);
    yield takeLatest(loginWithGoogleStart, handleLoginWithGoogle);
    yield takeLatest(sendmailStart, sendMailSaga);
    yield takeLatest(registerAdminStart, handleRegisterAdmin);
}
