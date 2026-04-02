import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/features/products/api/get-products";
import type { ProductFilters } from "./types";

export function useProductsQuery(filters: ProductFilters) {
  return useQuery({
    queryKey: [
      "products",
      filters.q,
      filters.category,
      filters.page,
      filters.limit,
    ],
    queryFn: () => getProducts(filters),
    staleTime: 1000 * 30,
  });
}
