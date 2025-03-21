import {
  fetchLocationStoreError,
  fetchLocationStoreStart,
  fetchLocationStoreSuccess,
} from "../slices/locationStoreSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchLocationStoreSaga() {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/locationStore`
    );
    yield put(fetchLocationStoreSuccess(response.data));
  } catch (error) {
    yield put(fetchLocationStoreError(error.message));
  }
}

export default function* locationStoreSaga() {
  yield takeLatest(fetchLocationStoreStart, fetchLocationStoreSaga);
}
