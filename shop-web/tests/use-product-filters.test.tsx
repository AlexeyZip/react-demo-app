import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { useProductFilters } from "@/features/products/model/use-product-filters";

function wrapperWithRoute(initialRoute: string) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>;
  };
}

describe("useProductFilters", () => {
  it("reads filters from url search params", () => {
    const { result } = renderHook(() => useProductFilters(), {
      wrapper: wrapperWithRoute("/?q=mouse&category=Accessories&page=2&limit=12"),
    });

    expect(result.current.filters).toEqual({
      q: "mouse",
      category: "Accessories",
      page: 2,
      limit: 12,
    });
  });

  it("updates filters and keeps valid defaults", () => {
    const { result } = renderHook(() => useProductFilters(), {
      wrapper: wrapperWithRoute("/"),
    });

    act(() => {
      result.current.setFilters({ q: "keyboard", category: "Displays", page: 3 });
    });

    expect(result.current.filters.q).toBe("keyboard");
    expect(result.current.filters.category).toBe("Displays");
    expect(result.current.filters.page).toBe(3);
    expect(result.current.filters.limit).toBe(6);
  });

  it("resets filters to first page and keeps current limit", () => {
    const { result } = renderHook(() => useProductFilters(), {
      wrapper: wrapperWithRoute("/?q=mouse&category=Accessories&page=2&limit=24"),
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filters).toEqual({
      q: "",
      category: "",
      page: 1,
      limit: 24,
    });
  });

  it("falls back to safe defaults for invalid page and limit", () => {
    const { result } = renderHook(() => useProductFilters(), {
      wrapper: wrapperWithRoute("/?page=-10&limit=0"),
    });

    expect(result.current.filters.page).toBe(1);
    expect(result.current.filters.limit).toBe(6);
  });
});
