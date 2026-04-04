import { checkoutSchema } from "@/features/checkout/model/checkout-schema";

describe("checkout schema", () => {
  it("accepts valid payload", () => {
    const result = checkoutSchema.safeParse({
      fullName: "John Doe",
      email: "john@shop.com",
      address: "Main street 12",
      city: "Kyiv",
      postalCode: "01001",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid payload", () => {
    const result = checkoutSchema.safeParse({
      fullName: "J",
      email: "not-email",
      address: "x",
      city: "K",
      postalCode: "1",
    });

    expect(result.success).toBe(false);
  });
});
