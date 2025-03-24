import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addInventoryHistoryError,
  addInventoryHistoryStart,
  addInventoryHistorySuccess,
  fetchInventoryHistoriesByStoreIdError,
  fetchInventoryHistoriesByStoreIdStart,
  fetchInventoryHistoriesByStoreIdSuccess,
} from "../slices/inventoryHistorySlice";

function* addInventoryHistorySaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/inventoryHistory`,
      action.payload
    );
    yield put(addInventoryHistorySuccess(response.data));
  } catch (error) {
    yield put(addInventoryHistoryError(error.message));
  }
}

function* fetchInventoryHistoryByStoreIdSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/inventoryHistory/${
        action.payload.storeid
      }?date=${action.payload.date}`
    );
    yield put(fetchInventoryHistoriesByStoreIdSuccess(response.data));
  } catch (error) {
    yield put(fetchInventoryHistoriesByStoreIdError(error.message));
  }
}

export default function* inventoryHistorySaga() {
  yield takeLatest(addInventoryHistoryStart, addInventoryHistorySaga);
  yield takeLatest(
    fetchInventoryHistoriesByStoreIdStart,
    fetchInventoryHistoryByStoreIdSaga
  );
}
