import { all } from "redux-saga/effects";
import authSaga from "./authSaga.jsx";
import categorySaga from "./categorySaga.jsx";
import productSaga from "./productSaga.jsx";
import cartSaga from "./cartSaga.jsx";
import orderSaga from "./orderSaga.jsx";
import orderDetailSaga from "./orderDetailSaga.jsx";
import commentSaga from "./commentSaga.jsx";
import notifySaga from "./notifySaga.jsx";
import storeSaga from "./storeSaga.jsx";
import storeAccountSaga from "./storeAccountSaga.jsx";
import branchSaga from "./branchSaga.jsx";
import colorSaga from "./colorSaga.jsx";
import productColorSaga from "./productColorSaga.jsx";
import productImageSaga from "./productImageSaga.jsx";

export default function* rootSaga() {
  yield all([
    authSaga(),
    categorySaga(),
    productSaga(),
    cartSaga(),
    orderSaga(),
    orderDetailSaga(),
    commentSaga(),
    notifySaga(),
    storeSaga(),
    storeAccountSaga(),
    branchSaga(),
    colorSaga(),
    productColorSaga(),
    productImageSaga()
  ]);
}
