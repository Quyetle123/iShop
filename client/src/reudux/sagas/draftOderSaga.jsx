import axios from "axios"
import { call, put, takeLatest } from "redux-saga/effects"
import { addDraftOderError, addDraftOderStart, addDraftOderSuccess, deleteDraftOderError, deleteDraftOderStart, deleteDraftOderSuccess } from "../slices/draftOderSlice";

function* addDraftOderSaga(action) {
    try {
      const response = yield call(
        axios.post,
        `${import.meta.env.VITE_LOCALHOST}/draftOder/addDraftOder`,
        action.payload
      );
      yield put(addDraftOderSuccess(response.data));
    } catch (error) {
      yield put(addDraftOderError(error.message));
    }
  }


function* deleteDraftOderSaga(action) {
    try {
        yield call(
            axios.delete,
            `${import.meta.env.VITE_LOCALHOST}/draftOder/deleteDraftOder/${action.payload}`
        );
        yield put(deleteDraftOderSuccess());
    } catch (error) {
        yield put(deleteDraftOderError(error.message));
    }
}

export default function* draftOderSaga() {
    yield takeLatest(addDraftOderStart, addDraftOderSaga);
    yield takeLatest(deleteDraftOderStart, deleteDraftOderSaga);
}