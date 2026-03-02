import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/Product/ProductSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import cartReducer from '../features/Cart/cartSlice';
import orderReducer from '../features/Order/OrderSlice';

// 1. Import the wishlist reducer
import wishlistReducer from '../features/Wishlist/WishlistSlice'; 

export const store = configureStore({
  reducer: {
    Product: productReducer,
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    
    // 2. Add the wishlist reducer to the store
    wishlist: wishlistReducer, 
  },
});