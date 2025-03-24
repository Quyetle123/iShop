import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getStoreStockError,
  getStoreStockStart,
  getStoreStockSuccess,
  initializeStoreStockError,
  initializeStoreStockStart,
  initializeStoreStockSuccess,
  updateQuantityStoreStockStart,
  updateQuantityStoreStockSuccess,
} from "../slices/storeStockSlice";
import { updateStatusStoreFailure } from "../slices/storeSlice";

function* initializeStoreStockSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/storeStock/initialize-store-stock`,
      action.payload
    );
    yield put(initializeStoreStockSuccess(response.data));
    yield put(getStoreStockStart());
  } catch (error) {
    yield put(initializeStoreStockError(error.message));
  }
}

function* getAllStoreStockSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/storeStock/${action.payload}`
    );
    yield put(getStoreStockSuccess(response.data));
  } catch (error) {
    yield put(getStoreStockError(error.message));
  }
}

function* updateQuantityStoreStockSaga(action) {
  try {
    const response = yield call(
      axios.put,
      `${import.meta.env.VITE_LOCALHOST}/storeStock/${action.payload.storeid}`,
      action.payload
    );
    yield put(updateQuantityStoreStockSuccess(response.data));
    yield put(getStoreStockStart(action.payload.storeid));
  } catch (error) {
    yield put(updateStatusStoreFailure(error.message));
  }
}

export default function* storeStockSaga() {
  yield takeLatest(initializeStoreStockStart, initializeStoreStockSaga);
  yield takeLatest(getStoreStockStart, getAllStoreStockSaga);
  yield takeLatest(updateQuantityStoreStockStart, updateQuantityStoreStockSaga);
}
