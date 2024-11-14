import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addProductColorFailure, addProductColorStart, addProductColorSuccess } from "../slices/productColorSlice";

function* addProductColorSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:5000/api/productColor/addProductColor",
      action.payload
    );
    yield put(addProductColorSuccess(response.data));
  } catch (error) {
    yield put(addProductColorFailure(error.message));
  }
}

export default function* productColorSaga() {
    yield takeLatest(addProductColorStart, addProductColorSaga)
}