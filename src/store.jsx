import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./feature/cartSlice";
export const store = configureStore({
  reducer: {
    counter: cartReducer,
  },
});
// https://fakestoreapi.com/products
