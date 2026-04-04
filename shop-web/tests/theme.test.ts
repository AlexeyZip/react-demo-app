import {
  applyTheme,
  getStoredTheme,
  resolveTheme,
  setStoredTheme,
} from "@/shared/theme/theme";

describe("theme utilities", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("returns system when no valid saved mode", () => {
    expect(getStoredTheme()).toBe("system");
  });

  it("stores selected theme", () => {
    setStoredTheme("dark");
    expect(getStoredTheme()).toBe("dark");
  });

  it("resolves explicit mode", () => {
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme("dark")).toBe("dark");
  });

  it("resolves system mode from matchMedia", () => {
    const matchMediaMock = jest.fn().mockReturnValue({ matches: true });
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: matchMediaMock,
    });

    expect(resolveTheme("system")).toBe("dark");
    expect(matchMediaMock).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
  });

  it("applies dark class to document root", () => {
    applyTheme("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    applyTheme("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("applies resolved system theme", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });

    applyTheme("system");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
