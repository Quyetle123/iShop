import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    addWishlistError,
    addWishlistStart,
    addWishlistSuccess,
    deleteWishlistError,
    deleteWishlistStart,
    deleteWishlistSuccess,
    fetchWishlistByAccountidError,
    fetchWishlistByAccountidStart,
    fetchWishlistByAccountidSuccess,
    
} from "../slices/wishlistSlice";
import { getToken } from "../../utils/token";

const token = getToken();

function* addWishlistSaga(action) {
    try {
        const Response = yield call(
            axios.post,
            "http://localhost:5000/api/wishlist/addWishlist",
            action.payload
        );
        yield put(addWishlistSuccess(Response.data));
    } catch (error) {
        yield put(addWishlistError(error.message));
    }
}

function* fetchWishlistByAccountidSaga(action) {
    try {
        const Response = yield call(
            axios.get,
            `http://localhost:5000/api/wishlist/${action.payload}`
        );
        yield put(fetchWishlistByAccountidSuccess(Response.data));
    } catch (error) {
        yield put(fetchWishlistByAccountidError(error.message));
    }
}

function* deleteWishlistSaga(action) {
    try {
        yield call(
            axios.delete,
            `http://localhost:5000/api/wishlist/deleteCart/${action.payload}`
        );
        yield put(deleteWishlistSuccess());
        yield put(fetchWishlistByAccountidStart(token.id));
    } catch (error) {
        yield put(deleteWishlistError(error.message));
    }
}

export default function* wishlistSaga() {
    yield takeLatest(addWishlistStart, addWishlistSaga);
    yield takeLatest(fetchWishlistByAccountidStart, fetchWishlistByAccountidSaga);
    yield takeLatest(deleteWishlistStart, deleteWishlistSaga);
}