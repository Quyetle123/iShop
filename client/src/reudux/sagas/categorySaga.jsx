import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addCategoryStart,
  addCategorySuccess,
  deleteCategoryStart,
  deleteCategorySuccess,
  fetchCategories,
  fetchCategoriesSuccess,
  fetchCategoryById,
  fetchCategoryByIdSuccess,
  setError,
  updateCategoryStart,
  updateCategorySuccess,
} from "../slices/categorySlice.jsx";

function* fetchCategoriesSaga() {
  try {
    const response = yield call(
      axios.get,
      "http://localhost:5000/api/category/allCategories"
    );
    yield put(fetchCategoriesSuccess(response.data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* fetchCategoryByIdSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:5000/api/category/${action.payload}`
    );
    yield put(fetchCategoryByIdSuccess(response.data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* addCategorySaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:5000/api/category/addCategory",
      action.payload
    );
    yield put(addCategorySuccess(response.data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* updateCategorySaga(action) {
  try {
    yield call(
      axios.put,
      `http://localhost:5000/api/category/updateCategory/${action.payload.id}`,
      action.payload
    );
    yield put(updateCategorySuccess(action.payload));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* deleteCategorySaga(action) {
  try {
    yield call(
      axios.delete,
      `http://localhost:5000/api/category/deleteCategory/${action.payload}`
    );
    yield put(deleteCategorySuccess());
    yield put(fetchCategories());
  } catch (error) {
    yield put(setError(error.message));
  }
}

export default function* categorySaga() {
  yield takeLatest(fetchCategories, fetchCategoriesSaga);
  yield takeLatest(fetchCategoryById, fetchCategoryByIdSaga);
  yield takeLatest(addCategoryStart, addCategorySaga);
  yield takeLatest(updateCategoryStart, updateCategorySaga);
  yield takeLatest(deleteCategoryStart, deleteCategorySaga);
}
