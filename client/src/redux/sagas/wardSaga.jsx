import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchWardsByDistrictIdError, fetchWardsByDistrictIdStart, fetchWardsByDistrictIdSuccess } from "../slices/wardSlice";

function* fetchWardByDistrictIdSaga(action) {
    try {
        const response = yield call(
            axios.get,
            `${import.meta.env.VITE_LOCALHOST}/ward/${action.payload}`
        );
        yield put(fetchWardsByDistrictIdSuccess(response.data));
    } catch (error) {
        yield put(fetchWardsByDistrictIdError(error.message));
    }
}

export default function* wardSaga() {
    yield takeLatest(fetchWardsByDistrictIdStart, fetchWardByDistrictIdSaga);
}