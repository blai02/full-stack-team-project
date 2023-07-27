import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import errorReducer from './errorSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    products: productReducer,
    cart: cartReducer
  },
  devTools: true
});
