import {takeEvery, put, call} from 'redux-saga/effects';
import axios from 'axios';
import {EVENTS} from '../utils/constant';
import {
  setData,
  setLoading,
  setError,
  setCartData,
  setfavouriteData,
  setfavoriteCounts,
  setcartCounts,
} from '../slices/ProductSlice';

interface ApiData {
}

const getProductsFromApi = async (): Promise<ApiData> => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getProduct = async (productId: string): Promise<ApiData> => {
  try {
    const response = await axios.get(
      `https://dummyjson.com/products/${productId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

function* handleGetProducts(): Generator<any, void, ApiData> {
  try {
    yield put(setLoading('pending'));

    const data: ApiData = yield call(getProductsFromApi);

    yield put(setData(data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* handleProductInfo(action: any): Generator<any, void, ApiData> {
  try {
    yield put(setLoading('pending'));

    const data: ApiData = yield call(getProduct, action.payload.product_id);

    yield put(setData(data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* receivedCartProduct(action: any): Generator<any, void, ApiData> {
  try {
    yield put(setCartData(action.payload.cartData));
    yield put(setcartCounts({cartCount: action.payload.cartData.length}));
  } catch (error) {
    yield put(setError(error.message));
  }
}
function* receivedfavouriteProduct(action: any): Generator<any, void, ApiData> {
  try {
    yield put(setfavouriteData(action.payload.favouriteData));
    yield put(
      setfavoriteCounts({favoriteCount: action.payload.favouriteData.length}),
    );
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* ProductSaga(): Generator {
  yield takeEvery(EVENTS.GET_PRODUCTS, handleGetProducts);
  yield takeEvery(EVENTS.GET_PRODUCT_INFO, handleProductInfo);
  yield takeEvery(EVENTS.SET_CART_PRODUCT, receivedCartProduct);
  yield takeEvery(EVENTS.SET_FAVOURITE_PRODUCT, receivedfavouriteProduct);
}

export default ProductSaga;
