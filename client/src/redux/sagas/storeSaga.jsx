import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    addStoreFailure,
    addStoreStart,
    addStoreSuccess,
    fetchStoreByIdFailure,
    fetchStoreByIdStart,
    fetchStoreByIdSuccess,
    getStoreByBranchIdStart,
    getStoreByBranchIdSuccess,
    updateStatusStoreFailure,
    updateStatusStoreStart,
    updateStatusStoreSuccess,
} from '../slices/storeSlice';
import { getAccountStorebyAccountIdStart } from '../slices/storeAccountSlice';
import { getToken } from '../../utils/token';
import { fetchAllBranchStart } from '../slices/branchSlice';

function* addStoreSaga(action) {
    try {
        const response = yield call(axios.post, `${import.meta.env.VITE_LOCALHOST}/store/addStore`, action.payload);
        yield put(addStoreSuccess(response.data));
        yield put(fetchAllBranchStart());
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

function* fetchStoreByBranchIdSaga(action) {
    try {
        const response = yield call(axios.get, `${import.meta.env.VITE_LOCALHOST}/store/branch/${action.payload}`);
        yield put(getStoreByBranchIdSuccess(response.data));
    } catch (error) {
        yield put(getStoreByBranchIdSuccess(error.message));
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
    yield takeLatest(getStoreByBranchIdStart, fetchStoreByBranchIdSaga);
}
