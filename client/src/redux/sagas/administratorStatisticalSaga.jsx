import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchGeneralStatisticalFailure,
  fetchGeneralStatisticalStart,
  fetchGeneralStatisticalSuccess,
  fetchOrderStatisticMonthFailure,
  fetchOrderStatisticMonthStart,
  fetchOrderStatisticMonthSuccess,
} from "../slices/administratorStatisticalSlice";

function* fetchgeneralStatisticalSaga(action) {
  try {
    console.log(action.payload);
    if (action.payload.type === "all") {
      const response = yield call(
        axios.get,
        `${import.meta.env.VITE_LOCALHOST}/administratorStatistical/general`
      );
      yield put(fetchGeneralStatisticalSuccess(response.data));
    } else if (action.payload.type === "custom") {
      const response = yield call(
        axios.get,
        `${
          import.meta.env.VITE_LOCALHOST
        }/administratorStatistical/general?type=${
          action.payload.type
        }&startMonth=${action.payload.startMonth}&startYear=${
          action.payload.startYear
        }&endMonth=${action.payload.endMonth}&endYear=${action.payload.endYear}`
      );
      yield put(fetchGeneralStatisticalSuccess(response.data));
    } else {
      const response = yield call(
        axios.get,
        `${
          import.meta.env.VITE_LOCALHOST
        }/administratorStatistical/general?type=${action.payload.type}`
      );
      yield put(fetchGeneralStatisticalSuccess(response.data));
    }
  } catch (error) {
    yield put(fetchGeneralStatisticalFailure(error.message));
  }
}

function* orderMonthSaga(action) {
  try {
    const { startMonth, endMonth, startYear, endYear } = action.payload;
    const response = yield call(
      axios.get,
      `${
        import.meta.env.VITE_LOCALHOST
      }/administratorStatistical/order-month?startMonth=${startMonth}&startYear=${startYear}&endMonth=${endMonth}&endYear=${endYear}`
    );
    yield put(fetchOrderStatisticMonthSuccess(response.data));
  } catch (error) {
    yield put(fetchOrderStatisticMonthFailure(error.message));
  }
}

export default function* administratorStatisticalSaga() {
  yield takeLatest(fetchGeneralStatisticalStart, fetchgeneralStatisticalSaga);
  yield takeLatest(fetchOrderStatisticMonthStart, orderMonthSaga);
}
