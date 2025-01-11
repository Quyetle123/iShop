import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addProductColorFailure,
  addProductColorStart,
  addProductColorSuccess,
  fetchProductColorByIdFailure,
  fetchProductColorByIdStart,
  fetchProductColorByIdSuccess,
  fetchProductColorsFailure,
  fetchProductColorsStart,
  fetchProductColorsSuccess,
} from "../slices/productColorSlice";
function* addProductColorSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.LOCALHOST}/productColor/addProductColor`,
      action.payload
    );
    yield put(addProductColorSuccess(response.data));
    yield put(fetchProductColorsStart());
  } catch (error) {
    yield put(addProductColorFailure(error.message));
  }
}

function* fetchProductColorsSaga() {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.LOCALHOST}/productColor`
    );
    yield put(fetchProductColorsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductColorsFailure(error.message));
  }
}

function* fetchProductColorByIdSaga(action) {
  try {
    const response = yield call(axios.get, `${import.meta.env.LOCALHOST}/productColor/${action.payload}`);
    yield put(fetchProductColorByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchProductColorByIdFailure(error.message));
  }
}

export default function* productColorSaga() {
  yield takeLatest(addProductColorStart, addProductColorSaga);
  yield takeLatest(fetchProductColorsStart, fetchProductColorsSaga);
  yield takeLatest(fetchProductColorByIdStart, fetchProductColorByIdSaga)
}
