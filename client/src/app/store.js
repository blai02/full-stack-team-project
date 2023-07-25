import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import errorReducer from './errorSlice';
import messageReducer from './messageSlice';
import cartReducer from './cartSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    messages: messageReducer,
    cart: cartReducer
  },
  devTools: true
});
