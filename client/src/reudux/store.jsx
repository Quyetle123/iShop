import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./slices/authSlice.jsx";
import categoryReducer from "./slices/categorySlice.jsx";
import rootSaga from "./sagas/index.jsx";
import productSlice from "./slices/productSlice.jsx";
import cartSlice from "./slices/cartSlice.jsx";
import orderSlice from "./slices/orderSlice.jsx";
import orderDetailSlice from "./slices/orderDetailSlice.jsx"
import commentSlice from "./slices/commentSlice.jsx"
import notifySlice from "./slices/notifySlice.jsx";
import storeSlice from "./slices/storeSlice.jsx";
import storeAccountSlice from "./slices/storeAccountSlice.jsx";
import branchSlice from "./slices/branchSlice.jsx";
import colorSlice from "./slices/colorSlice.jsx";
import productColorSlice from "./slices/productColorSlice.jsx";
import productImageSlice from "./slices/productImageSlice.jsx";
import postSlice from "./slices/postSlice.jsx";
import wishlistSlice from "./slices/wishlistSlice.jsx"

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productSlice,
    carts: cartSlice,
    orders: orderSlice,
    orderDetails: orderDetailSlice,
    comments: commentSlice,
    notifies: notifySlice,
    stores: storeSlice,
    storeAccounts: storeAccountSlice,
    branches: branchSlice,
    colors: colorSlice,
    productColors: productColorSlice,
    productImages: productImageSlice,
    posts: postSlice,
    wishlists: wishlistSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
