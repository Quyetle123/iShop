import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addAdditionalAddressError, addAdditionalAddressStart, addAdditionalAddressSuccess, fetchAdditionalAddressByIdError, fetchAdditionalAddressByIdStart, fetchAdditionalAddressByIdSuccess, fetchAdditionalAddressesError, fetchAdditionalAddressesStart, fetchAdditionalAddressesSuccess } from "../slices/additionalAddressSlice";
import { fetchMainAddressError, fetchMainAddressStart, fetchMainAddressSuccess } from "../slices/addressSlice";
import { getToken } from "../../utils/token";

function* addAdditionalAddressSaga(action) {
    try {
        const response = yield call(
            axios.post,
            `${import.meta.env.VITE_LOCALHOST}/address/addAdress`,
            action.payload
        );
        yield put(addAdditionalAddressSuccess(response.data));
        yield put(fetchAdditionalAddressesStart(getToken().id));
    } catch (error) {
        yield put(addAdditionalAddressError(error.message));
    }
}

function* fetchAdditionalAddressSaga(action) {
    try {
        const response = yield call(
            axios.get,
            `${import.meta.env.VITE_LOCALHOST}/address/user/${action.payload}`
        )
        yield put(fetchAdditionalAddressesSuccess(response.data));
        console.log('response', response.data);
    } catch (error) {
        yield put(fetchAdditionalAddressesError(error.message));
    }
}

function * mainAddressSaga(action) {
    try {
        const response = yield call(
            axios.get,
            `${import.meta.env.VITE_LOCALHOST}/address/main/${action.payload}`
        )
        yield put(fetchMainAddressSuccess(response.data));
    } catch (error) {
        yield put(fetchMainAddressError(error.message));
    }
}

function * fetchAdditionalAddressByIdSaga(action) {
    try {
        const response = yield call(
            axios.get,
            `${import.meta.env.VITE_LOCALHOST}/address/${action.payload}`
        )
        yield put(fetchAdditionalAddressByIdSuccess(response.data));
    } catch (error) {
        yield put(fetchAdditionalAddressByIdError(error.message));
    }
}

export default function* additionalAddressSaga() {
    yield takeLatest(addAdditionalAddressStart, addAdditionalAddressSaga);
    yield takeLatest(fetchAdditionalAddressesStart, fetchAdditionalAddressSaga);
    yield takeLatest(fetchMainAddressStart, mainAddressSaga);
    yield takeLatest(fetchAdditionalAddressByIdStart, fetchAdditionalAddressByIdSaga);
}