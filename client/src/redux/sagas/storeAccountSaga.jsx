import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addStoreAccountFailure, addStoreAccountStart, addStoreAccountSuccess } from "../slices/storeAccountSlice";

function* addAccountStoreSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:5000/api/storeAccount/addStoreAccount",
      action.payload
    );
    yield put(addStoreAccountSuccess(response.data));
  } catch (error) {
    yield put(addStoreAccountFailure(error.message));
  }
}

export default function* storeAccountSaga() {
    yield takeLatest(addStoreAccountStart, addAccountStoreSaga);
}
