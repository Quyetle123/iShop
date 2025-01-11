import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addOrderDetailFailure, addOrderDetailStart, addOrderDetailSuccess } from "../slices/orderDetailSlice";

function* addOrderDetailSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.LOCALHOST}/orderDetail/addOrderDetail`,
      action.payload
    );
    yield put(addOrderDetailSuccess(response.data));
    console.log(response)
  } catch (error) {
    yield put(addOrderDetailFailure(error.message))
  }
}

export default function* orderDetailSaga() {
    yield takeLatest(addOrderDetailStart, addOrderDetailSaga)
}
