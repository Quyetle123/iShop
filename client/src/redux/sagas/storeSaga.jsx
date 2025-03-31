import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    addStoreFailure,
    addStoreStart,
    addStoreSuccess,
    fetchStoreByIdFailure,
    fetchStoreByIdStart,
    fetchStoreByIdSuccess,
    updateStatusStoreFailure,
    updateStatusStoreStart,
    updateStatusStoreSuccess,
} from '../slices/storeSlice';
import { getAccountStorebyAccountIdStart } from '../slices/storeAccountSlice';
import { getToken } from '../../utils/token';

function* addStoreSaga(action) {
    try {
        const response = yield call(axios.post, `${import.meta.env.VITE_LOCALHOST}/store/addStore`, action.payload);
        yield put(addStoreSuccess(response.data));
    } catch (error) {
        yield put(addStoreFailure(error.message));
    }
}

function* fetchStoreByIdSaga(action) {
    try {
        const response = yield call(axios.get, `${import.meta.env.VITE_LOCALHOST}/store/${action.payload}`);
        yield put(fetchStoreByIdSuccess(response.data));
    } catch (error) {
        yield put(fetchStoreByIdFailure(error.message));
    }
}

function* updateStatusStoreSaga(action) {
    try {
        const response = yield call(
            axios.put,
            `${import.meta.env.VITE_LOCALHOST}/store/status/${action.payload.id}`,
            action.payload,
        );
        yield put(updateStatusStoreSuccess(response.data));
        yield put(getAccountStorebyAccountIdStart(getToken().id));
    } catch (error) {
        yield put(updateStatusStoreFailure(error.message));
    }
}

export default function* storeSaga() {
    yield takeLatest(addStoreStart, addStoreSaga);
    yield takeLatest(updateStatusStoreStart, updateStatusStoreSaga);
    yield takeLatest(fetchStoreByIdStart, fetchStoreByIdSaga);
}
