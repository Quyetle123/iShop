import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addBranchFailure, addBranchStart, addBranchSuccess, fetchAllBranchFailure, fetchAllBranchStart, fetchAllBranchSuccess } from "../slices/branchSlice";

function* addBranchSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/branch/addBranch`,
      action.payload
    );
    yield put(addBranchSuccess(response.data));
    yield put(fetchAllBranchStart());
  } catch (error) {
    yield put(addBranchFailure(error.message));
  }
}

function* fetchAllBranchSaga() {
    try {
        const response = yield call(axios.get, `${import.meta.env.VITE_LOCALHOST}/branch`);
        yield put(fetchAllBranchSuccess(response.data));
    } catch (error) {
        yield put(fetchAllBranchFailure(error.message))
    }
}

export default function* branchSaga() {
    yield takeLatest(addBranchStart, addBranchSaga);
    yield takeLatest(fetchAllBranchStart, fetchAllBranchSaga)
}
