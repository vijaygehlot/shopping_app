import {createSelector, createSlice} from '@reduxjs/toolkit';

interface ProductState {
  data: any[]; // Adjust the type according to the actual structure of your product data
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  cartData: any[];
  favouriteData: any[];
  cartCount: number;
  favoriteCount: number;
}

const initialState: ProductState = {
  data: [],
  loading: 'idle',
  error: null,
  cartData: [],
  favouriteData: [],
  cartCount: 0,
  favoriteCount: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = 'succeeded';
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = 'failed';
    },
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
    setfavouriteData: (state, action) => {
      state.favouriteData = action.payload;
    },
    setcartCounts: (state, action) => {
      state.cartCount = action.payload.cartCount;
    },
    setfavoriteCounts: (state, action) => {
      state.favoriteCount = action.payload.favoriteCount;
    },
  },
});

const selectProductState = (state: RootState) => state.product;

export const selectAllProducts = createSelector(selectProductState, state => {
  return state.data;
});

export const selectCartData = createSelector(selectProductState, state => {
  return state.cartData;
});

export const selectfavouriteData = createSelector(selectProductState, state => {
  return state.favouriteData;
});

export const selectCartCount = createSelector(selectProductState, state => {
  return state.cartCount;
});

export const selectfavouriteCount = createSelector(
  selectProductState,
  state => {
    return state.favoriteCount;
  },
);

export const {
  setData,
  setLoading,
  setError,
  setCartData,
  setfavouriteData,
  setcartCounts,
  setfavoriteCounts,
} = productSlice.actions;
export default productSlice.reducer;
