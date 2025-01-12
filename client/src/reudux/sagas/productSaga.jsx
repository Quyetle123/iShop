import { call, put, takeLatest } from "redux-saga/effects";
import {
  addProductStart,
  addProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  fetchProductByCateIdStart,
  fetchProductByCateIdSuccess,
  fetchProductByCateStart,
  fetchProductByCateSuccess,
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
      `${import.meta.env.LOCALHOST}/product/addProduct`,
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
      `${import.meta.env.LOCALHOST}/product/allProducts`
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
      `${import.meta.env.LOCALHOST}/product/${action.payload}`
    );
    yield put(fetchProductByIdSuccess(response.data));
  } catch (error) {
    yield put(productError(error.message));
  }
}

function* fetchProductByCateIdSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.LOCALHOST}/product/productByCateId/${action.payload}`
    );
    yield put(fetchProductByCateIdSuccess(response.data));
  } catch (error) {
    yield put(productError(error.message));
  }
}
function* fetchProductByCateSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:5000/api/product/productByCate/${action.payload}`
    );
    yield put(fetchProductByCateSuccess(response.data));
  } catch (error) {
    yield put(productError(error.message));
  }
}

function* updateProductSaga(action) {
  try {
    yield call(
      axios.put,
      `${import.meta.env.LOCALHOST}/product/updateProduct/${action.payload.id}`,
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
      `${import.meta.env.LOCALHOST}/product/deleteProduct/${action.payload}`
    );
    yield put(deleteProductSuccess());
    yield put(fetchProductesStart());
  } catch (error) {
    yield put(productError(error.message));
  }
}

export default function* productSaga() {
  yield takeLatest(addProductStart.type, addProductSaga);
  yield takeLatest(fetchProductesStart.type, fetchProductesSaga);
  yield takeLatest(fetchProductByIdStart.type, fetchProductByIdSaga);
  yield takeLatest(fetchProductByCateIdStart.type, fetchProductByCateIdSaga);
  yield takeLatest(fetchProductByCateStart.type, fetchProductByCateIdSaga);
  yield takeLatest(updateProductStart.type, updateProductSaga);
  yield takeLatest(deleteProductStart.type, deleteProductSaga);
}
