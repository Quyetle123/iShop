import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    addChatBoxError,
    addChatBoxStart,
    addChatBoxSuccess,
    checkStoreAiError,
    checkStoreAiStart,
    checkStoreAiSuccess,
} from '../slices/aiSlice';

function* addChatBoxSaga(action) {
    try {
        const response = yield call(axios.post, `${import.meta.env.VITE_LOCALHOST}/chat`, action.payload);
        yield put(addChatBoxSuccess(response.data));
    } catch (error) {
        yield put(addChatBoxError(error.message));
    }
}

function* checkStockStoreAiSaga() {
    try {
        const response = yield call(axios.get, `${import.meta.env.VITE_LOCALHOST}/assistant`);
        yield put(checkStoreAiSuccess(response.data));
    } catch (error) {
        yield put(checkStoreAiError(error.message));
    }
}

export default function* aiSaga() {
    yield takeLatest(addChatBoxStart, addChatBoxSaga);
    yield takeLatest(checkStoreAiStart, checkStockStoreAiSaga);
}
