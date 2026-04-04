import {
  loadCartState,
  saveCartState,
} from "@/features/cart/model/cart-storage";
import { initialCartState } from "@/features/cart/model/cart-slice";

describe("cart storage", () => {
  const key = "shop-web/cart";

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns initial state when empty", () => {
    expect(loadCartState()).toEqual(initialCartState);
  });

  it("saves and loads valid cart state", () => {
    const state = {
      items: [
        {
          productId: "p1",
          title: "Mouse",
          price: 12.5,
          imageUrl: "img",
          quantity: 2,
        },
      ],
    };

    saveCartState(state);

    expect(window.localStorage.getItem(key)).toBeTruthy();
    expect(loadCartState()).toEqual(state);
  });

  it("returns initial state for malformed data", () => {
    window.localStorage.setItem(key, JSON.stringify({ items: [{ quantity: 0 }] }));

    expect(loadCartState()).toEqual(initialCartState);
  });
});
