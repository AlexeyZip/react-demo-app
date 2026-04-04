import { getAccessToken, setAccessToken } from "@/shared/api/auth-token";

describe("auth token store", () => {
  afterEach(() => {
    setAccessToken(null);
  });

  it("stores token in memory", () => {
    setAccessToken("token-1");
    expect(getAccessToken()).toBe("token-1");
  });

  it("clears token", () => {
    setAccessToken("token-1");
    setAccessToken(null);
    expect(getAccessToken()).toBeNull();
  });
});
