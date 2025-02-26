import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addStoreAccountFailure, addStoreAccountStart, addStoreAccountSuccess, getAccountStorebyAccountIdFailure, getAccountStorebyAccountIdStart, getAccountStorebyAccountIdSuccess } from "../slices/storeAccountSlice";

function* addAccountStoreSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/storeAccount/addStoreAccount`,
      action.payload
    );
    yield put(addStoreAccountSuccess(response.data));
  } catch (error) {
    yield put(addStoreAccountFailure(error.message));
  }
}

function* getAccountStoreByAccountIdSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/storeAccount/${action.payload}`
    );
    yield put(getAccountStorebyAccountIdSuccess(response.data));
  } catch (error) {
    yield put(getAccountStorebyAccountIdFailure(error.message));
  }
}

export default function* storeAccountSaga() {
    yield takeLatest(addStoreAccountStart, addAccountStoreSaga);
    yield takeLatest(getAccountStorebyAccountIdStart, getAccountStoreByAccountIdSaga);
}
