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
  productStatisticError,
  productStatisticStart,
  productStatisticSuccess,
  setError,
  updateCategoryStart,
  updateCategorySuccess,
} from "../slices/categorySlice.jsx";

function* fetchCategoriesSaga() {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/category/allCategories`
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
      `${import.meta.env.VITE_LOCALHOST}/category/${action.payload}`
    );
    yield put(fetchCategoryByIdSuccess(response.data.category[0]));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* addCategorySaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/category/addCategory`,
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
      `${import.meta.env.VITE_LOCALHOST}/category/updateCategory/${
        action.payload.id
      }`,
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
      `${import.meta.env.VITE_LOCALHOST}/category/deleteCategory/${
        action.payload
      }`
    );
    yield put(deleteCategorySuccess());
    yield put(fetchCategories());
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* productStatisticSaga() {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/category`
    );
    yield put(productStatisticSuccess(response.data));
  } catch (error) {
    yield put(productStatisticError(error.message));
  }
}

export default function* categorySaga() {
  yield takeLatest(fetchCategories, fetchCategoriesSaga);
  yield takeLatest(fetchCategoryById, fetchCategoryByIdSaga);
  yield takeLatest(addCategoryStart, addCategorySaga);
  yield takeLatest(updateCategoryStart, updateCategorySaga);
  yield takeLatest(deleteCategoryStart, deleteCategorySaga);
  yield takeLatest(productStatisticStart, productStatisticSaga)
}
