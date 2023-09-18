/** @format */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookType } from "../types/Book";

type CartState = {
  items: BookType[];
};
const initialState: CartState = {
  items: [],
};
export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<BookType>) => {
      state.items.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((e) => e.id != action.payload);
    },
  },
});

export default CartSlice.reducer;
export const { addToCart, removeCartItem } = CartSlice.actions;
