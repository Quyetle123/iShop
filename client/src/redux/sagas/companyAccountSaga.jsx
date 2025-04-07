import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    fetchCompanyAccountError,
    fetchCompanyAccountStart,
    fetchCompanyAccountSuccess,
} from '../slices/companyAccountSlice';

function* fetchCompanyAccountByAccountIdSaga(action) {
    try {
        const response = yield call(axios.get, `${import.meta.env.VITE_LOCALHOST}/companyAccount/${action.payload}`);
        yield put(fetchCompanyAccountSuccess(response.data));
    } catch (error) {
        yield put(fetchCompanyAccountError(error.message));
    }
}

export default function* companyAccountSaga() {
    yield takeLatest(fetchCompanyAccountStart, fetchCompanyAccountByAccountIdSaga);
}
