import {
  loadAuthState,
  saveAuthState,
} from "@/features/auth/model/auth-storage";
import { initialAuthState } from "@/features/auth/model/auth-slice";

describe("auth storage", () => {
  const key = "shop-web/auth";

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns initial state when storage is empty", () => {
    expect(loadAuthState()).toEqual(initialAuthState);
  });

  it("saves and loads valid auth state", () => {
    const state = {
      user: { id: "u1", email: "user@shop.com", role: "user" as const },
      token: "token-1",
      isAuthenticated: true,
    };

    saveAuthState(state);

    expect(window.localStorage.getItem(key)).toBeTruthy();
    expect(loadAuthState()).toEqual(state);
  });

  it("returns initial state for invalid payload", () => {
    window.localStorage.setItem(key, JSON.stringify({ invalid: true }));

    expect(loadAuthState()).toEqual(initialAuthState);
  });
});
