import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addAdditionalAddressError, addAdditionalAddressStart, addAdditionalAddressSuccess, fetchAdditionalAddressesStart } from "../slices/additionalAddressSlice";

function* addAdditionalAddressSaga(action) {
    try {
        yield call(
            axios.post,
            `${import.meta.env.VITE_LOCALHOST}/address/addAdress`,
            action.payload
        );
        yield put(addAdditionalAddressSuccess());
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
        yield put(addAdditionalAddressSuccess(response.data));
    } catch (error) {
        yield put(addAdditionalAddressError(error.message));
    }
}

export default function* additionalAddressSaga() {
    yield takeLatest(addAdditionalAddressStart, addAdditionalAddressSaga);
    yield takeLatest(fetchAdditionalAddressesStart, fetchAdditionalAddressSaga);
}