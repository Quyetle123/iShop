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
  orderMonthFailure,
  orderMonthStart,
  orderMonthSuccess,
  orderStatisticFailure,
  orderStatisticStart,
  orderStatisticSuccess,
  updateStatusFailure,
  updateStatusStart,
  updateStatusSuccess,
} from "../slices/orderSlice";

function* addOrderSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/order/addOrder`,
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
      `${import.meta.env.VITE_LOCALHOST}/order/getOrderByAccountid/${
        action.payload
      }`
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
      `${import.meta.env.VITE_LOCALHOST}/order/getAllOrder`
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
      `${import.meta.env.VITE_LOCALHOST}/order/updateStatusOrder/${
        action.payload.id
      }`,
      action.payload
    );
    yield put(updateStatusSuccess());
    yield put(getAllOrderStart());
  } catch (error) {
    yield put(updateStatusFailure(error.message));
  }
}

function* orderStatisticSaga() {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/order/statistics`
    );
    yield put(orderStatisticSuccess(response.data));
  } catch (error) {
    yield put(orderStatisticFailure(error.message));
  }
}

function* orderMonthSaga(action) {
  try {
    const { startMonth, endMonth, startYear, endYear } = action.payload;
    const response = yield call(
      axios.get,
      `${
        import.meta.env.VITE_LOCALHOST
      }/order/month?startMonth=${startMonth}&startYear=${startYear}&endMonth=${endMonth}&endYear=${endYear}`
    );
    yield put(orderMonthSuccess(response.data));
  } catch (error) {
    yield put(orderMonthFailure(error.message));
  }
}

export default function* orderSaga() {
  yield takeLatest(addOrderStart, addOrderSaga);
  yield takeLatest(getOrderStart, getOrderSaga);
  yield takeLatest(getAllOrderStart, getAllOrderSaga);
  yield takeLatest(updateStatusStart, updateStatusSaga);
  yield takeLatest(orderStatisticStart, orderStatisticSaga);
  yield takeLatest(orderMonthStart, orderMonthSaga);
}
