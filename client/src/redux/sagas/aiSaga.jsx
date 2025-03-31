import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { addChatBoxError, addChatBoxStart, addChatBoxSuccess } from '../slices/aiSlice';

function* addChatBoxSaga(action) {
    try {
        const response = yield call(axios.post, `${import.meta.env.VITE_LOCALHOST}/chat`, action.payload);
        yield put(addChatBoxSuccess(response.data));
    } catch (error) {
        yield put(addChatBoxError(error.message));
    }
}

export default function* aiSaga() {
    yield takeLatest(addChatBoxStart, addChatBoxSaga);
}
