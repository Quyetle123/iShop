import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addColorFailure,
  addColorStart,
  addColorSuccess,
  getAllColorStart,
  getAllColorSuccess,
} from "../slices/colorSlice";

function* addColorSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:5000/api/color/addColor",
      action.payload
    );
    yield put(addColorSuccess(response.data));
    yield put(getAllColorStart());
  } catch (error) {
    yield put(addColorFailure(error.message));
  }
}

function* getAllColorSaga() {
  try {
    const response = yield call(axios.get, "http://localhost:5000/api/color");
    yield put(getAllColorSuccess(response.data));
  } catch (error) {
    yield put(getAllColorSuccess(error.message))
  }
}

export default function* colorSaga() {
  yield takeLatest(addColorStart, addColorSaga);
  yield takeLatest(getAllColorStart, getAllColorSaga);
}