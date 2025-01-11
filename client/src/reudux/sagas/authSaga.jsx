/* eslint-disable react-hooks/rules-of-hooks */
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
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
      `${import.meta.env.LOCALHOST}/auth/register`,
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
      `${import.meta.env.LOCALHOST}/auth/login`,
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

export default function* authSaga() {
  yield takeLatest(registerStart.type, handleRegister);
  yield takeLatest(loginStart.type, handleLogin);
}
