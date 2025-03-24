import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { addPaymentError, addPaymentStart, addPaymentSuccess } from '../slices/paymentSlice';
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

export default function* paymentSaga() {
    yield takeLatest(addPaymentStart, addPaymentSaga);
}
