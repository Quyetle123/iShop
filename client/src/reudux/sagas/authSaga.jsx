/* eslint-disable react-hooks/rules-of-hooks */
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchAccountFailure,
  fetchAccountsStart,
  fetchAccountsSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "../slices/authSlice.jsx";

function* handleRegister(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:5000/api/auth/register",
      action.payload
    );
    if (response && response.data) {
      yield put(
        registerSuccess({
          account: response.data.account,
          token: response.data.token,
        })
      );
    } else {
      yield put(registerFailure("k có data"));
    }
  } catch (error) {
    yield put(registerFailure(error.response.data.message));
  }
}

function* handleLogin(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:5000/api/auth/login",
      action.payload
    );
    if (response) {
      localStorage.setItem("token", response.data.token);
      yield put(
        loginSuccess({
          account: response.data.account,
          token: response.data.token,
          role: response.data.account.role,
        })
      );
    }
  } catch (error) {
    yield put(loginFailure(error.response.data.message));
  }
}

function* getAccountsSaga() {
  try {
    const response = yield call(axios.get, "http://localhost:5000/api/auth");
    yield put(fetchAccountsSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(registerStart, handleRegister);
  yield takeLatest(loginStart, handleLogin);
  yield takeLatest(fetchAccountsStart, getAccountsSaga);
}
