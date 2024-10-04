import { all } from "redux-saga/effects";
import authSaga from "./authSaga.jsx";
import categorySaga from "./categorySaga.jsx";
import productSaga from "./productSaga.jsx";
import cartSaga from "./cartSaga.jsx";

export default function* rootSaga() {
  yield all([authSaga(), categorySaga(), productSaga(), cartSaga()]);
}
