import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchProvincesStart, fetchProvincesSuccess } from "../slices/provinceSlice";
import { fetchProvincesError } from "../slices/addressSlice";

function* fetchProvinceSaga() {
    try {
        const response = yield call(
            axios.get,
            `${import.meta.env.VITE_LOCALHOST}/province`
        );
        yield put(fetchProvincesSuccess(response.data));
    } catch (error) {
        yield put(fetchProvincesError(error.message));
    }
}

export default function* provinceSaga() {
    yield takeLatest(fetchProvincesStart, fetchProvinceSaga);
}