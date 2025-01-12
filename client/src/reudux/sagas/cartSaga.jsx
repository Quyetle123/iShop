import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addCartError,
  addCartStart,
  addCartSuccess,
  deleteCartError,
  deleteCartStart,
  deleteCartSucess,
  fetchCartByAccountidError,
  fetchCartByAccountidStart,
  fetchCartByAccountidSuccess,
  updateQuantityError,
  updateQuantityStart,
  updateQuantitySuccess,
} from "../slices/cartSlice";
import { getToken } from "../../utils/token";
                                                                                                                                                                       
const token = getToken();

function* addCartSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${import.meta.env.VITE_LOCALHOST}/cart/addCart`,
      action.payload
    );
    yield put(addCartSuccess(response.data));
  } catch (error) {
    yield put(addCartError(error.message));
  }
}

function* fetchCartByAccountidSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `${import.meta.env.VITE_LOCALHOST}/cart/${action.payload}`
    );
    yield put(fetchCartByAccountidSuccess(response.data));
  } catch (error) {
    yield put(fetchCartByAccountidError(error.message));
  }
}

function* updateQuantitySaga(action) {
  try {
    yield call(
      axios.put,
      `${import.meta.env.VITE_LOCALHOST}/cart/updateQuantity/${action.payload.id}`,
      action.payload
    );
    yield put(updateQuantitySuccess());
    yield put(fetchCartByAccountidStart(token.id));
  } catch (error) {
    yield put(updateQuantityError(error.message));
  }
}

function* deleteCartSaga(action) {
  try {
    yield call(
      axios.delete,
      `${import.meta.env.VITE_LOCALHOST}/cart/deleteCart/${action.payload}`
    );
    yield put(deleteCartSucess());
    yield put(fetchCartByAccountidStart(token.id));
  } catch (error) {
    yield put(deleteCartError(error.message));
  }
}

export default function* cartSaga() {
  yield takeLatest(addCartStart, addCartSaga);
  yield takeLatest(fetchCartByAccountidStart, fetchCartByAccountidSaga);
  yield takeLatest(updateQuantityStart, updateQuantitySaga);
  yield takeLatest(deleteCartStart, deleteCartSaga);
}
