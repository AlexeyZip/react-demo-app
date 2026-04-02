import { z } from "zod";
import { initialCartState, type CartState } from "./cart-slice";

const CART_STORAGE_KEY = "shop-web/cart";

const cartSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      title: z.string(),
      price: z.number(),
      imageUrl: z.string(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export function loadCartState(): CartState {
  if (typeof window === "undefined") return initialCartState;

  const raw = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return initialCartState;

  try {
    const parsed = JSON.parse(raw);
    const result = cartSchema.safeParse(parsed);
    return result.success ? result.data : initialCartState;
  } catch {
    return initialCartState;
  }
}

export function saveCartState(state: CartState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
}
