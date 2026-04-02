import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ProductFilters } from "./types";

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<ProductFilters>(() => {
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 6);

    return {
      q: searchParams.get("q") ?? "",
      category: searchParams.get("category") ?? "",
      page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
      limit: Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 6,
    };
  }, [searchParams]);

  const setFilters = (next: Partial<ProductFilters>) => {
    const merged: ProductFilters = { ...filters, ...next };

    const params = new URLSearchParams();
    if (merged.q.trim()) params.set("q", merged.q.trim());
    if (merged.category.trim()) params.set("category", merged.category.trim());
    params.set("page", String(merged.page));
    params.set("limit", String(merged.limit));

    setSearchParams(params, { replace: true });
  };

  const resetFilters = () =>
    setSearchParams(
      { page: "1", limit: String(filters.limit) },
      { replace: true },
    );

  return { filters, setFilters, resetFilters };
}
