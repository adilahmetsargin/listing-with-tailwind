import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartProducts.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.cartProducts.push(action.payload);
      }
    },

    incrementQuantity: (state, action) => {
      state.cartProducts = state.cartProducts.map((product) => {
        if (product.id === action.payload.id) {
          product.quantity += 1;
        }
        return product;
      });
    },
    decrementQuantity: (state, action) => {
      if (action.payload.quantity === 1) {
        return;
      }
      state.cartProducts = state.cartProducts.map((product) => {
        if (product.id === action.payload.id) {
          product.quantity -= 1;
        }
        return product;
      });
    },
    removeFromCart: (state, action) => {
      const productToRemove = action.payload;
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== productToRemove.id
      );
    },
    setCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },
  },
});

export const {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  setCartProducts,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
