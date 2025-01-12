import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addVoucherUsageError, addVoucherUsageStart, addVoucherUsageSuccess } from "../slices/voucherUsageSlice";


function* addVoucherUsageSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:5000/api/voucherProduct/addVoucherProduct",
      action.payload
    );
    yield put(addVoucherUsageSuccess(response.data));
  } catch (error) {
    yield put(addVoucherUsageError(error.message));
  }
}

export default function* voucherUsageSaga() {
    yield takeLatest(addVoucherUsageStart, addVoucherUsageSaga);
}
