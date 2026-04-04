import {
  authReducer,
  initialAuthState,
  login,
  logout,
} from "@/features/auth/model/auth-slice";

describe("auth-slice", () => {
  it("logs in user", () => {
    const state = authReducer(
      initialAuthState,
      login({
        token: "token-1",
        user: {
          id: "u1",
          email: "user@shop.com",
          role: "user",
        },
      }),
    );

    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe("token-1");
    expect(state.user?.email).toBe("user@shop.com");
  });

  it("logs out user", () => {
    const loggedIn = authReducer(
      initialAuthState,
      login({
        token: "token-1",
        user: {
          id: "u1",
          email: "user@shop.com",
          role: "user",
        },
      }),
    );
    const state = authReducer(loggedIn, logout());

    expect(state).toEqual(initialAuthState);
  });
});
