import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { addCommentFailure, addCommentStart, addCommentSuccess } from "../slices/commentSlice";

function* addCommentSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/comment/addComment`,
      action.payload
    );
    yield put(addCommentSuccess(response.data));
  } catch (error) {
    yield put(addCommentFailure(error.message));
  }
}

export default function* commentSaga() {
    yield takeLatest(addCommentStart, addCommentSaga);
}
