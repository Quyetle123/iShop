import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addPaymentError,
  addPaymentStart,
  addPaymentSuccess,
} from "../slices/paymentSlice";

function* addPaymentSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/payment/create-payment`,
      action.payload
    );
    if (response.data.paymentUrl) {
      window.location.href = response.data.paymentUrl;
    } else {
      console.error("❌ Không nhận được URL thanh toán từ API");
    }
    yield put(addPaymentSuccess(response.data));
  } catch (error) {
    yield put(addPaymentError(error.message));
  }
}

export default function* paymentSaga() {
  yield takeLatest(addPaymentStart, addPaymentSaga);
}
