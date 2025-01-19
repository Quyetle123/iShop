import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addVoucherProductError,
  addVoucherProductStart,
  addVoucherProductSuccess,
} from "../slices/voucherProductSlice";

function* addVoucherProductSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/voucherProduct/addVoucherProduct`,
      action.payload
    );
    yield put(addVoucherProductSuccess(response.data));
  } catch (error) {
    yield put(addVoucherProductError(error.message));
  }
}

export default function* voucherProductSaga() {
  yield takeLatest(addVoucherProductStart, addVoucherProductSaga);
}
