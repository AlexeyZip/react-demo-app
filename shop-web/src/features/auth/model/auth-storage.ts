import { z } from "zod";
import { initialAuthState, type AuthState } from "./auth-slice";

const AUTH_STORAGE_KEY = "shop-web/auth";

const persistedAuthSchema = z.object({
  user: z
    .object({
      id: z.string(),
      email: z.email(),
      role: z.enum(["user", "admin"]),
    })
    .nullable(),
  token: z.string().nullable(),
  isAuthenticated: z.boolean(),
});

export function loadAuthState(): AuthState {
  if (typeof window === "undefined") {
    return initialAuthState;
  }

  const rawState = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawState) {
    return initialAuthState;
  }

  try {
    const parsedState = JSON.parse(rawState);
    const result = persistedAuthSchema.safeParse(parsedState);

    if (!result.success) {
      return initialAuthState;
    }

    return result.data;
  } catch {
    return initialAuthState;
  }
}

export function saveAuthState(authState: AuthState): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
}
