import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth/model/auth-slice";
import {
  loadAuthState,
  saveAuthState,
} from "@/features/auth/model/auth-storage";
import { cartReducer } from "@/features/cart/model/cart-slice";
import {
  loadCartState,
  saveCartState,
} from "@/features/cart/model/cart-storage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  preloadedState: {
    auth: loadAuthState(),
    cart: loadCartState(),
  },
});

let currentAuthState = store.getState().auth;
let currentCartState = store.getState().cart;

store.subscribe(() => {
  const nextAuthState = store.getState().auth;
  const nextCartState = store.getState().cart;

  if (nextAuthState !== currentAuthState) {
    currentAuthState = nextAuthState;
    saveAuthState(nextAuthState);
  }

  if (nextCartState !== currentCartState) {
    currentCartState = nextCartState;
    saveCartState(nextCartState);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
