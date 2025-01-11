import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addProductImageFailure,
  addProductImageStart,
  addProductImageSuccess,
} from "../slices/productImageSlice";

function* addProductImageSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:5000/api/productImage/addProductImage",
      action.payload
    );
    yield put(addProductImageSuccess(response.data));
  } catch (error) {
    yield put(addProductImageFailure(error.message));
  }
}

export default function* productImageSaga() {
  yield takeLatest(addProductImageStart, addProductImageSaga);
}
