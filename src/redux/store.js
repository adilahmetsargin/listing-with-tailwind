import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cartProducts: cartReducer,
  },
});

export default store;
