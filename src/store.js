// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/shop/userSlice'
import customerReducer from './features/customer/customerSlice'
import orderReducer from './features/customer/orderSlice'
 
const store = configureStore({
    reducer: {
      auth: authReducer,
      users: userReducer,
      customer: customerReducer,
      orders: orderReducer,

    }
});

export default store;