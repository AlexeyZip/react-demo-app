import { loginSchema } from "@/features/auth/model/login-schema";

describe("login schema", () => {
  it("accepts valid payload", () => {
    const result = loginSchema.safeParse({
      email: "user@shop.com",
      password: "secret123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = loginSchema.safeParse({
      email: "invalid-email",
      password: "secret123",
    });

    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = loginSchema.safeParse({
      email: "user@shop.com",
      password: "123",
    });

    expect(result.success).toBe(false);
  });
});
