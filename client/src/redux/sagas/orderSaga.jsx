import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addOrderFailure,
  addOrderStart,
  addOrderSuccess,
  getAllOrderFailure,
  getAllOrderStart,
  getAllOrderSuccess,
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
  updateStatusFailure,
  updateStatusStart,
  updateStatusSuccess,
} from "../slices/orderSlice";

function* addOrderSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:5000/api/order/addOrder",
      action.payload
    );
    yield put(addOrderSuccess(response.data));
  } catch (error) {
    yield put(addOrderFailure(error.message));
  }
}

function* getOrderSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:5000/api/order/getOrderByAccountid/${action.payload}`
    );
    yield put(getOrderSuccess(response.data));
  } catch (error) {
    yield put(getOrderFailure(error.message));
  }
}

function* getAllOrderSaga() {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:5000/api/order/getAllOrder`
    );
    yield put(getAllOrderSuccess(response.data));
  } catch (error) {
    yield put(getAllOrderFailure(error.message));
  }
}

function* updateStatusSaga(action) {
  try {
    yield call(
      axios.put,
      `http://localhost:5000/api/order/updateStatusOrder/${action.payload.id}`,
      action.payload
    );
    yield put(updateStatusSuccess());
    yield put(getAllOrderStart());
  } catch (error) {
    yield put(updateStatusFailure(error.message));
  }
}

export default function* orderSaga() {
  yield takeLatest(addOrderStart, addOrderSaga);
  yield takeLatest(getOrderStart, getOrderSaga);
  yield takeLatest(getAllOrderStart, getAllOrderSaga);
  yield takeLatest(updateStatusStart, updateStatusSaga)
}
