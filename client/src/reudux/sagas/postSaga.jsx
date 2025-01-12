import { call, put, takeLatest } from "redux-saga/effects";
import {
  addPostError,
  addPostStart,
  addPostSuccess,
  deletePostError,
  deletePostStart,
  deletePostSuccess,
  fetchPostByIdError,
  fetchPostByIdStart,
  fetchPostByIdSuccess,
  fetchPostsError,
  fetchPostsStart,
  fetchPostsSuccess,
  updatePostError,
  updatePostStart,
  updatePostSuccess,
} from "../slices/postSlice";
import axios from "axios";

function* addPostSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.LOCALHOST}/post/addPost`,
      action.payload
    );
    yield put(addPostSuccess(response.data));
  } catch (error) {
    yield put(addPostError(error.message));
  }
}

function* fetchPostsSaga() {
  try {
    const response = yield call(axios.get, `${import.meta.env.LOCALHOST}/post`);
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchPostsError(error.message));
  }
}

function* fetchPostByIdSaga(action) {
  try {
    const response = yield call(axios.get, `${import.meta.env.LOCALHOST}/post/${action.payload}`);
    yield put(fetchPostByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchPostByIdError(error.message))
  }
}

function* updatePostSaga(action) {
  try {
    yield call(axios.put, `${import.meta.env.LOCALHOST}/post/updatePost/${action.payload.id}`, action.payload);
    yield put(updatePostSuccess());
    yield put(fetchPostsStart());
  } catch (error) {
    yield put(updatePostError(error.message))
  }
}

function* deletePostSaga(action) {
  try {
    yield call(
      axios.delete,
      `http://localhost:5000/api/post/deletePost/${action.payload}`
    );
    yield put(deletePostSuccess());
    yield put(fetchPostsStart());
  } catch (error) {
    yield put(deletePostError(error.message));
  }
}

export default function* postSaga() {
  yield takeLatest(addPostStart, addPostSaga);
  yield takeLatest(fetchPostsStart, fetchPostsSaga);
  yield takeLatest(fetchPostByIdStart, fetchPostByIdSaga);
  yield takeLatest(updatePostStart, updatePostSaga);
  yield takeLatest(deletePostStart, deletePostSaga); 
}
