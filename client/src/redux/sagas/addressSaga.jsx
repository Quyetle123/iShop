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
  updateMainAddressSuccess,
  updateMainAddressError,
  updateMainAddressStart,
  addMainAddressError,
  addMainAddressStart,
  fetchMainAddressStart,
} from "../slices/addressSlice";
import { getToken } from "../../utils/token";
import { fetchAdditionalAddressesStart } from "../slices/additionalAddressSlice";

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

function* addMainAddressSaga(action) {
  try {
    yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/address/addMainAdress`,
      action.payload
    );
    yield put(fetchMainAddressStart(getToken().id));
    yield put(fetchAdditionalAddressesStart(getToken().id));
    yield put()
  } catch (error) {
    yield put(addMainAddressError(error.message));
  }
}

function* updateMainAddressSaga(action) {
  try {
    const response = yield call(
      axios.put,
      `${import.meta.env.VITE_LOCALHOST}/address/updateMainAdress/${action.payload.id}`,
      action.payload
    );
    yield put(updateMainAddressSuccess(response.data));
    yield put(fetchMainAddressStart(getToken().id));
    yield put(fetchAdditionalAddressesStart(getToken().id));
  } catch (error) {
    yield put(updateMainAddressError(error.message));
  }
}

export default function* addressSaga() {
  yield takeLatest(fetchProvincesStart, fetchProvincesSaga);
  yield takeLatest(fetchDistrictsStart, fetchDistrictsSaga);
  yield takeLatest(fetchWardsStart, fetchWardsSaga);
  yield takeLatest(addMainAddressStart, addMainAddressSaga);
  yield takeLatest(updateMainAddressStart, updateMainAddressSaga);
}
