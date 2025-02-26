import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addOrderFailure,
  addOrderStart,
  addOrderSuccess,
  getAllOrderFailure,
  getAllOrderStart,
  getAllOrderSuccess,
  getOrderByIdFailure,
  getOrderByIdStart,
  getOrderByIdSuccess,
  getOrderDraftFailure,
  getOrderDraftStart,
  getOrderDraftSuccess,
  getOrderFailure,
  getOrderStart,
  getOrderStatusFailure,
  getOrderStatusStart,
  getOrderStatusSuccess,
  getOrderSuccess,
  newOrderFailure,
  newOrderStart,
  newOrderSuccess,
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

function* getOrderByIdSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/order/orderById/${action.payload}`
    );
    yield put(getOrderByIdSuccess(response.data));
  } catch (error) {
    yield put(getOrderByIdFailure(error.message));
  }
}

function* getOrderStatusSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/order/orderStatus/${action.payload.storeid}?status=${action.payload.status}&page=${action.payload.page}&pageSize=${action.payload.pageSize}`
    );
    yield put(getOrderStatusSuccess(response.data));
  } catch (error) {
    yield put(getOrderStatusFailure(error.message));
  } 
}

function* getOrderDraftSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/order/orderDraft/${action.payload}`
    );
    yield put(getOrderDraftSuccess(response.data));
  } catch (error) {
    yield put(getOrderDraftFailure(error.message));
  }
}

function* newOrderSaga(action) {
  try {
    yield call(
      axios.put,
      `${import.meta.env.VITE_LOCALHOST}/order/new/${action.payload.id}`,
      action.payload
    );
    yield put(newOrderSuccess());
    yield put(newOrderStart);
  } catch (error) {
    yield put(newOrderFailure(error.message));
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

function* orderStatisticSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/order/statistics/${action.payload}`
    );
    yield put(orderStatisticSuccess(response.data));
  } catch (error) {
    yield put(orderStatisticFailure(error.message));
  }
}

function* orderMonthSaga(action) {
  try {
    const { storeid, startMonth, endMonth, startYear, endYear } = action.payload;
    const response = yield call(
      axios.get,
      `${
        import.meta.env.VITE_LOCALHOST
      }/order/month/${storeid}?startMonth=${startMonth}&startYear=${startYear}&endMonth=${endMonth}&endYear=${endYear}`
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
  yield takeLatest(getOrderByIdStart, getOrderByIdSaga);
  yield takeLatest(getOrderStatusStart, getOrderStatusSaga);
  yield takeLatest(getOrderDraftStart, getOrderDraftSaga);
  yield takeLatest(newOrderStart, newOrderSaga)
  yield takeLatest(updateStatusStart, updateStatusSaga);
  yield takeLatest(orderStatisticStart, orderStatisticSaga);
  yield takeLatest(orderMonthStart, orderMonthSaga);
}
