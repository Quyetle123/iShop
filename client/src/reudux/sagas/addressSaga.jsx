import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProvincesError,
  fetchProvincesStart,
  fetchProvincesSuccess,
  fetchDistrictsError,
  fetchDistrictsStart,
  fetchDistrictsSuccess,
  fetchWardsError,
  fetchWardsStart,
  fetchWardsSuccess,
} from "../slices/addressSlice";

function* fetchProvincesSaga() {
  try {
    const response = yield call(
      axios.get,
      "https://provinces.open-api.vn/api/p/"
    );
    yield put(fetchProvincesSuccess(response.data));
  } catch (error) {
    yield put(fetchProvincesError(error.message));
  }
}

function* fetchDistrictsSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `https://provinces.open-api.vn/api/p/${action.payload}?depth=2`
    );
    yield put(fetchDistrictsSuccess(response.data));
  } catch (error) {
    yield put(fetchDistrictsError(error.message));
  }
}

function* fetchWardsSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `https://provinces.open-api.vn/api/d/${action.payload}?depth=2`
    );
    yield put(fetchWardsSuccess(response.data));
  } catch (error) {
    yield put(fetchWardsError(error.message));
  }
}

export default function* addressSaga() {
  yield takeLatest(fetchProvincesStart, fetchProvincesSaga);
  yield takeLatest(fetchDistrictsStart, fetchDistrictsSaga);
  yield takeLatest(fetchWardsStart, fetchWardsSaga);
}
