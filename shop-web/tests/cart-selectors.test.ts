import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotalPrice,
} from "@/features/cart/model/selectors";
import type { RootState } from "@/app/store/store";

describe("cart selectors", () => {
  const mockState = {
    cart: {
      items: [
        {
          productId: "p1",
          title: "Mouse",
          price: 10,
          imageUrl: "x",
          quantity: 2,
        },
        {
          productId: "p2",
          title: "Keyboard",
          price: 25.5,
          imageUrl: "y",
          quantity: 1,
        },
      ],
    },
  } as RootState;

  it("selects cart items", () => {
    expect(selectCartItems(mockState)).toHaveLength(2);
  });

  it("calculates total quantity", () => {
    expect(selectCartItemsCount(mockState)).toBe(3);
  });

  it("calculates total price", () => {
    expect(selectCartTotalPrice(mockState)).toBe(45.5);
  });
});
