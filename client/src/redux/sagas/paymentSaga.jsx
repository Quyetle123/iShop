import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    addPaymentError,
    addPaymentStart,
    addPaymentSuccess,
    updateInfoPaymentError,
    updateInfoPaymentSatrt,
    updateInfoPaymentSuccess,
} from '../slices/paymentSlice';

function* addPaymentSaga(action) {
    try {
        const response = yield call(axios.post, `${import.meta.env.VITE_LOCALHOST}/payment`, action.payload);
        yield put(addPaymentSuccess(response.data));
        if (response.data) {
            window.location.href = response.data;
        }
    } catch (error) {
        yield put(addPaymentError(error.message));
    }
}

function* updateInfoPaymentSaga(action) {
    try {
        const response = yield call(
            axios.put,
            `${import.meta.env.VITE_LOCALHOST}/payment/update-info-payment`,
            action.payload,
        );
        yield put(updateInfoPaymentSuccess(response.data));
    } catch (error) {
        yield put(updateInfoPaymentError(error.message));
    }
}

export default function* paymentSaga() {
    yield takeLatest(addPaymentStart, addPaymentSaga);
    yield takeLatest(updateInfoPaymentSatrt, updateInfoPaymentSaga);
}
