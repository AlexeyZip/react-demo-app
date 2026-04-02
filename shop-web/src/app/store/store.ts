import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth/model/auth-slice";
import {
  loadAuthState,
  saveAuthState,
} from "@/features/auth/model/auth-storage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: loadAuthState(),
  },
});

let currentAuthState = store.getState().auth;

store.subscribe(() => {
  const nextAuthState = store.getState().auth;

  if (nextAuthState !== currentAuthState) {
    currentAuthState = nextAuthState;
    saveAuthState(nextAuthState);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
