import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addVoucherAccountError, addVoucherAccountStart, addVoucherAccountSuccess } from "../slices/voucherAccountSlice";

function* addVoucherAccountSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/voucherAccount/addVoucherAccount`,
      action.payload
    );
    yield put(addVoucherAccountSuccess(response.data));
  } catch (error) {
    yield put(addVoucherAccountError(error.message));
  }
}

export default function* voucherAccountSaga() {
    yield takeLatest(addVoucherAccountStart, addVoucherAccountSaga);
}

