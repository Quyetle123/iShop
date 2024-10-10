import { all } from "redux-saga/effects";
import authSaga from "./authSaga.jsx";
import categorySaga from "./categorySaga.jsx";
import productSaga from "./productSaga.jsx";
import cartSaga from "./cartSaga.jsx";
import orderSaga from "./orderSaga.jsx";
import orderDetailSaga from "./orderDetailSaga.jsx";

export default function* rootSaga() {
  yield all([authSaga(), categorySaga(), productSaga(), cartSaga(), orderSaga(), orderDetailSaga()]);
}
