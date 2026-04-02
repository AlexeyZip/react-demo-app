import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/entities/product/model/types";
import type { CartItem } from "@/entities/cart/model/types";

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const existing = state.items.find(
        (item) => item.productId === action.payload.id,
      );

      if (existing) {
        existing.quantity += 1;
        return;
      }

      state.items.push({
        productId: action.payload.id,
        title: action.payload.title,
        price: action.payload.price,
        imageUrl: action.payload.imageUrl,
        quantity: 1,
      });
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },
    setQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) {
      const item = state.items.find(
        (cartItem) => cartItem.productId === action.payload.productId,
      );
      if (!item) return;

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) => cartItem.productId !== action.payload.productId,
        );
        return;
      }

      item.quantity = action.payload.quantity;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
