import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addVourcherError,
  addVourcherStart,
  addVourcherSuccess,
  deleteVourcherError,
  deleteVourcherStart,
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
import { deleteCartSucess } from "../slices/cartSlice";

function* addVourcherSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/vourcher/addVourcher`,
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
      `${import.meta.env.VITE_LOCALHOST}/vourcher`
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
      `${import.meta.env.VITE_LOCALHOST}/vourcher/${action.payload}`
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
      `${import.meta.env.VITE_LOCALHOST}/vourcher/updateVourcher/${action.payload.id}`,
      action.payload
    );
    yield put(updateVourcherSuccess());
    yield put(updateVourcherStart());
  } catch (error) {
    yield put(updateVourcherError(error.message));
  }
}

function* deleteVourcherSaga(action) {
  try {
    yield call(
      axios.delete,
      `${import.meta.env.VITE_LOCALHOST}/vourcher/${action.payload}`
    );
    yield put(deleteCartSucess());
    yield put(fetchVourchersStart());
  } catch (error) {
    yield put(deleteVourcherError(error.message));
  }
}

export default function* vourcherSaga() {
  yield takeLatest(addVourcherStart, addVourcherSaga);
  yield takeLatest(fetchVourchersStart, fetchVourchersSaga);
  yield takeLatest(fetchVourcherByIdStart, fetchVourcherByIdSaga);
  yield takeLatest(updateVourcherStart, updateVourcherSaga);
  yield takeLatest(deleteVourcherStart, deleteVourcherSaga);
}
