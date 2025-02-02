import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addStoreFailure, addStoreStart, addStoreSuccess } from "../slices/storeSlice";

function* addStoreSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/store/addStore`,
      action.payload
    );
    yield put(addStoreSuccess(response.data));
  } catch (error) {
    yield put(addStoreFailure(error.message));
  }
}

export default function* storeSaga() {
    yield takeLatest(addStoreStart, addStoreSaga);
}
