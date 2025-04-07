import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchProductStaticsError,
    fetchProductStaticsStart,
    fetchProductStaticsSuccess,
    getStoreStockError,
    getStoreStockStart,
    getStoreStockSuccess,
    initializeStoreStockError,
    initializeStoreStockStart,
    initializeStoreStockSuccess,
    updateQuantityStoreStockStart,
    updateQuantityStoreStockSuccess,
    updateStoreStockError,
    updateStoreStockStart,
    updateStoreStockSuccess,
} from '../slices/storeStockSlice';
import { updateStatusStoreFailure } from '../slices/storeSlice';

function* initializeStoreStockSaga(action) {
    try {
        const response = yield call(
            axios.post,
            `${import.meta.env.VITE_LOCALHOST}/storeStock/initialize-store-stock`,
            action.payload,
        );
        yield put(initializeStoreStockSuccess(response.data));
        yield put(getStoreStockStart());
    } catch (error) {
        yield put(initializeStoreStockError(error.message));
    }
}

function* updateStoreStockSaga(action) {
    try {
        const response = yield call(
            axios.post,
            `${import.meta.env.VITE_LOCALHOST}/storeStock/sync-new-products-to-stores`,
            action.payload,
        );
        yield put(updateStoreStockSuccess(response.data));
        // yield put(getStoreStockStart(action.payload.storeid));
    } catch (error) {
        yield put(updateStoreStockError(error.message));
    }
}

function* getAllStoreStockSaga(action) {
    try {
        const response = yield call(axios.get, `${import.meta.env.VITE_LOCALHOST}/storeStock/${action.payload}`);
        yield put(getStoreStockSuccess(response.data));
    } catch (error) {
        yield put(getStoreStockError(error.message));
    }
}

function* updateQuantityStoreStockSaga(action) {
    try {
        const response = yield call(
            axios.put,
            `${import.meta.env.VITE_LOCALHOST}/storeStock/${action.payload.storeid}`,
            action.payload,
        );
        yield put(updateQuantityStoreStockSuccess(response.data));
        yield put(getStoreStockStart(action.payload.storeid));
    } catch (error) {
        yield put(updateStatusStoreFailure(error.message));
    }
}

function* fetchProductStatisticsSaga(action) {
    try {
        const response = yield call(
            axios.get,
            `${import.meta.env.VITE_LOCALHOST}/storeStock/statistics/${action.payload}`,
        );
        yield put(fetchProductStaticsSuccess(response.data));
    } catch (error) {
        yield put(fetchProductStaticsError(error.message));
    }
}

export default function* storeStockSaga() {
    yield takeLatest(initializeStoreStockStart, initializeStoreStockSaga);
    yield takeLatest(updateStoreStockStart, updateStoreStockSaga);
    yield takeLatest(getStoreStockStart, getAllStoreStockSaga);
    yield takeLatest(updateQuantityStoreStockStart, updateQuantityStoreStockSaga);
    yield takeLatest(fetchProductStaticsStart, fetchProductStatisticsSaga);
}
