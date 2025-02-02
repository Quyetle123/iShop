import { call, put, takeLatest } from "redux-saga/effects";
import {
  addProductStart,
  addProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  fetchProductByCateIdStart,
  fetchProductByCateIdSuccess,
  fetchProductByCateStart,
  fetchProductByIdStart,
  fetchProductByIdSuccess,
  fetchProductesStart,
  fetchProductesSuccess,
  productError,
  updateProductStart,
  updateProductSuccess,
} from "../slices/productSlice.jsx";
import axios from "axios";

function* addProductSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/product/addProduct`,
      action.payload
    );
    yield put(addProductSuccess(response.data));
  } catch (error) {
    yield put(productError(error.message));
  }
}

function* fetchProductesSaga() {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/product/allProducts`
    );
    yield put(fetchProductesSuccess(response.data));
    console.log(response);
  } catch (error) {
    yield put(productError(error.message));
  }
}

function* fetchProductByIdSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/product/${action.payload}`
    );
    yield put(fetchProductByIdSuccess(response.data));
  } catch (error) {
    yield put(productError(error.message));
  }
}

function* fetchProductByCateIdSaga(action) {
  try {
    const categoryId = action.payload;
    const response = yield call(
      axios.get,
      `http://localhost:5000/api/product/productByCate/${categoryId}`
      `${import.meta.env.VITE_LOCALHOST}/product/productByCateId/${action.payload}`
    );
    yield put(fetchProductByCateIdSuccess(response.data));
  } catch (error) {
    yield put(productError(error.message));
  }
}

function* updateProductSaga(action) {
  try {
    yield call(
      axios.put,
      `${import.meta.env.VITE_LOCALHOST}/product/updateProduct/${action.payload.id}`,
      action.payload
    );
    yield put(fetchProductesStart());
    yield put(updateProductSuccess(action.payload));
  } catch (error) {
    yield put(productError(error.message));
  }
}

function* deleteProductSaga(action) {
  try {
    yield call(
      axios.delete,
      `${import.meta.env.VITE_LOCALHOST}/product/deleteProduct/${action.payload}`
    );
    yield put(deleteProductSuccess());
    yield put(fetchProductesStart());
  } catch (error) {
    yield put(productError(error.message));
  }
}

export default function* productSaga() {
  yield takeLatest(addProductStart, addProductSaga);
  yield takeLatest(fetchProductesStart, fetchProductesSaga);
  yield takeLatest(fetchProductByIdStart, fetchProductByIdSaga);
  yield takeLatest(fetchProductByCateIdStart, fetchProductByCateIdSaga);
  yield takeLatest(updateProductStart, updateProductSaga);
  yield takeLatest(deleteProductStart, deleteProductSaga);
}
