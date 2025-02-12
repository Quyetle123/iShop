import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addAddressSaveError, addAddressSaveStart, addAddressSaveSuccess, deleteAddressSaveError, deleteAddressSaveSucess, deleteAddressSveStart, fetchAddressSavesError, fetchAddressSavesStart, fetchAddressSavesSuccess, updateAddressSaveError, updateAddressSaveStart, updateAddressSaveSuccsess } from "../slices/addressSaveSlice";

function* addAddressSaveSaga(action) {
    try {
        const response = yield call(
            axios.post,
            `${import.meta.env.VITE_LOCALHOST}/addressSave/addAddressSave`, action.payload
        );
        yield put(addAddressSaveSuccess(response.data));
    } catch (error) {
        yield put(addAddressSaveError(error.message));
    }
}

function* fetchAddressSavesSaga() {
    try {
        const response = yield call(
            axios.get,
            `${import.meta.env.VITE_LOCALHOST}/addressSave`);
        yield put(fetchAddressSavesSuccess(response.data));
    } catch (error) {
        yield put(fetchAddressSavesError(error.message));
    }
}


function* updateAddressSaveSaga(action) {
    try {
        yield call(
            axios.put,
            `${import.meta.env.VITE_LOCALHOST}/addressSave/${action.payload.id}`, action.payload
        );
        yield put(updateAddressSaveSuccsess());
        yield put(fetchAddressSavesStart());
    } catch (error) {
        yield put(updateAddressSaveError(error.message));
    }
}

function* deleteAddressSaveSaga(action) {
    try {
        yield call(
            axios.delete,
            `${import.meta.env.VITE_LOCALHOST}/addressSave/deleteAddressSave/${action.payload}`
        );
        yield put(deleteAddressSaveSucess());
        yield put(fetchAddressSavesStart());
    } catch (error) {
        yield put(deleteAddressSaveError(error.message));
    }
}

export default function* addressSaveSaga() {
    yield takeLatest(addAddressSaveStart, addAddressSaveSaga);
    yield takeLatest(fetchAddressSavesStart, fetchAddressSavesSaga);
    yield takeLatest(updateAddressSaveStart, updateAddressSaveSaga);
    yield takeLatest(deleteAddressSveStart, deleteAddressSaveSaga);
}