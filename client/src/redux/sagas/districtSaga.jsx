import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchDistrictByProvinceIdError, fetchDistrictByProvinceIdStart, fetchDistrictByProvinceIdSuccess } from "../slices/districtSlice";

function* getDistrictByProviceIdSaga(action) {
    try {
        const response = yield call(
            axios.get,
            `${import.meta.env.VITE_LOCALHOST}/district/${action.payload}`
        );
        yield put(fetchDistrictByProvinceIdSuccess(response.data));
    } catch (error) {
        yield put(fetchDistrictByProvinceIdError(error.message));
    }
}

export default function* districtSaga() {
    yield takeLatest(fetchDistrictByProvinceIdStart, getDistrictByProviceIdSaga);
}