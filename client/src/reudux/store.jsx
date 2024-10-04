import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./slices/authSlice.jsx";
import categoryReducer from "./slices/categorySlice.jsx";
import rootSaga from "./sagas/index.jsx";
import productSlice from "./slices/productSlice.jsx";
import cartSlice from "./slices/cartSlice.jsx";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productSlice,
    carts: cartSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
