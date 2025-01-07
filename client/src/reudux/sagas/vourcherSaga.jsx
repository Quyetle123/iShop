import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addVourcherError,
  addVourcherStart,
  addVourcherSuccess,
  fetchVourcherByIdError,
  fetchVourcherByIdStart,
  fetchVourcherByIdSuccess,
  fetchVourchersError,
  fetchVourchersStart,
  fetchVourchersSuccess,
  updateVourcherError,
  updateVourcherStart,
  updateVourcherSuccess,
} from "../slices/vourcherSlice";

function* addVourcherSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:5000/api/vourcher/addVourcher",
      action.payload
    );
    yield put(addVourcherSuccess(response.data));
  } catch (error) {
    yield put(addVourcherError(error.message));
  }
}

function* fetchVourchersSaga() {
  try {
    const response = yield call(
      axios.get,
      "http://localhost:5000/api/vourcher"
    );
    yield put(fetchVourchersSuccess(response.data));
  } catch (error) {
    yield put(fetchVourchersError(error.message));
  }
}

function* fetchVourcherByIdSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:5000/api/vourcher/${action.payload}`
    );
    yield put(fetchVourcherByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchVourcherByIdError(error.message));
  }
}

function* updateVourcherSaga(action) {
  try {
    yield call(
      axios.put,
      `http://localhost:5000/api/vourcher/updateVourcher/${action.payload.id}`,
      action.payload
    );
    yield put(updateVourcherSuccess());
    yield put(updateVourcherStart());
  } catch (error) {
    yield put(updateVourcherError(error.message))
  }
}

export default function* vourcherSaga() {
  yield takeLatest(addVourcherStart, addVourcherSaga);
  yield takeLatest(fetchVourchersStart, fetchVourchersSaga);
  yield takeLatest(fetchVourcherByIdStart, fetchVourcherByIdSaga);
  yield takeLatest(updateVourcherStart, updateVourcherSaga)
}
