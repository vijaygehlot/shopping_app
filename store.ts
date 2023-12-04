import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import productReducer from './src/slices/ProductSlice'; // Import the reducer from the ProductSlice
import ProductSaga from './src/sagas/ProductSaga';

const sagaMiddleware = createSagaMiddleware();
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    product: productReducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware], // Include saga middleware
});

sagaMiddleware.run(ProductSaga);

export default store;
