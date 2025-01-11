import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { deleteNotifyFailure, deleteNotifyStart, deleteNotifySuccess, fetchNotifyFailure, fetchNotifyStart, fetchNotifySuccess } from "../slices/notifySlice";
import { getToken } from "../../utils/token";

const token = getToken()

function* fetchNotifyByAcountidSaga(action) {
    try {
        const response = yield call(axios.get, `${import.meta.env.LOCALHOST}/notify/${action.payload}`);
        yield put(fetchNotifySuccess(response.data));
    } catch (error) {
        yield put(fetchNotifyFailure(error.message));
    }
}

function* deleteNotifySaga(action) {
    try {
        yield call(axios.delete, `${import.meta.env.LOCALHOST}/notify/deleteNotify/${action.payload}`);
        yield put(deleteNotifySuccess());
        yield put(fetchNotifyStart(token.id));
    } catch (error) {
        yield put(deleteNotifyFailure(error.message));
    }
}

export default function* notifySaga() {
    yield takeLatest(fetchNotifyStart, fetchNotifyByAcountidSaga);
    yield takeLatest(deleteNotifyStart, deleteNotifySaga);
}