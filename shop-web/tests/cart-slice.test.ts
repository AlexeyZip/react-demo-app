import {
  addItem,
  cartReducer,
  clearCart,
  initialCartState,
  removeItem,
  setQuantity,
} from "@/features/cart/model/cart-slice";
import type { Product } from "@/entities/product/model/types";

const mockProduct: Product = {
  id: "p1",
  title: "Keyboard",
  description: "Mechanical keyboard",
  price: 99.99,
  imageUrl: "https://example.com/keyboard.jpg",
  category: "Accessories",
  inStock: true,
};

describe("cart-slice", () => {
  it("adds new item", () => {
    const state = cartReducer(initialCartState, addItem(mockProduct));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({
      productId: "p1",
      quantity: 1,
    });
  });

  it("increments quantity for existing item", () => {
    const withItem = cartReducer(initialCartState, addItem(mockProduct));
    const updated = cartReducer(withItem, addItem(mockProduct));

    expect(updated.items).toHaveLength(1);
    expect(updated.items[0].quantity).toBe(2);
  });

  it("removes item", () => {
    const withItem = cartReducer(initialCartState, addItem(mockProduct));
    const updated = cartReducer(withItem, removeItem("p1"));

    expect(updated.items).toHaveLength(0);
  });

  it("updates quantity", () => {
    const withItem = cartReducer(initialCartState, addItem(mockProduct));
    const updated = cartReducer(
      withItem,
      setQuantity({ productId: "p1", quantity: 5 }),
    );

    expect(updated.items[0].quantity).toBe(5);
  });

  it("removes item when quantity set to 0", () => {
    const withItem = cartReducer(initialCartState, addItem(mockProduct));
    const updated = cartReducer(
      withItem,
      setQuantity({ productId: "p1", quantity: 0 }),
    );

    expect(updated.items).toHaveLength(0);
  });

  it("clears cart", () => {
    const withItems = cartReducer(
      cartReducer(initialCartState, addItem(mockProduct)),
      addItem({ ...mockProduct, id: "p2" }),
    );
    const updated = cartReducer(withItems, clearCart());

    expect(updated.items).toEqual([]);
  });
});
