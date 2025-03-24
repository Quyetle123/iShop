import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/authSlice.jsx';
import categoryReducer from './slices/categorySlice.jsx';
import rootSaga from './sagas/index.jsx';
import productSlice from './slices/productSlice.jsx';
import cartSlice from './slices/cartSlice.jsx';
import orderSlice from './slices/orderSlice.jsx';
import orderDetailSlice from './slices/orderDetailSlice.jsx';
import commentSlice from './slices/commentSlice.jsx';
import notifySlice from './slices/notifySlice.jsx';
import storeSlice from './slices/storeSlice.jsx';
import storeAccountSlice from './slices/storeAccountSlice.jsx';
import branchSlice from './slices/branchSlice.jsx';
import colorSlice from './slices/colorSlice.jsx';
import productColorSlice from './slices/productColorSlice.jsx';
import productImageSlice from './slices/productImageSlice.jsx';
import postSlice from './slices/postSlice.jsx';
import wishlistSlice from './slices/wishlistSlice.jsx';
import vourcherSlice from './slices/vourcherSlice.jsx';
import voucherAccountSlice from './slices/voucherAccountSlice.jsx';
import voucherProductSlice from './slices/voucherProductSlice.jsx';
import voucherUsageSlice from './slices/voucherUsageSlice.jsx';
import addressSlice from './slices/addressSlice.jsx';
import additionalAddressSlice from './slices/additionalAddressSlice.jsx';
import storeStockSlice from './slices/storeStockSlice.jsx';
import provinceSlice from './slices/provinceSlice.jsx';
import districtSlice from './slices/districtSlice.jsx';
import wardSlice from './slices/wardSlice.jsx';
import adminstratorStatiscalSlice from './slices/administratorStatisticalSlice.jsx';
import inventoryHistorySlice from './slices/inventoryHistorySlice.jsx';
import locationStoreSlice from './slices/locationStoreSlice.jsx';
import paymentSlice from './slices/paymentSlice.jsx';

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
        wishlists: wishlistSlice,
        vourchers: vourcherSlice,
        voucherAccounts: voucherAccountSlice,
        voucherProducts: voucherProductSlice,
        voucherUsages: voucherUsageSlice,
        addresses: addressSlice,
        additionalAddresses: additionalAddressSlice,
        storeStocks: storeStockSlice,
        provinces: provinceSlice,
        districts: districtSlice,
        wards: wardSlice,
        administratorStatisticals: adminstratorStatiscalSlice,
        inventoryHistories: inventoryHistorySlice,
        locationStores: locationStoreSlice,
        payments: paymentSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
