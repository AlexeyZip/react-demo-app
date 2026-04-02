import { apiRequest } from "@/shared/api/http";
import type { Product } from "@/entities/product/model/types";
import type {
  PaginatedResponse,
  ProductFilters,
} from "@/features/products/model/types";

function toQueryString(filters: ProductFilters) {
  const params = new URLSearchParams();

  if (filters.q.trim()) params.set("q", filters.q.trim());
  if (filters.category.trim()) params.set("category", filters.category.trim());

  params.set("page", String(filters.page));
  params.set("limit", String(filters.limit));

  return `?${params.toString()}`;
}

export function getProducts(filters: ProductFilters) {
  return apiRequest<PaginatedResponse<Product>>(
    `/products${toQueryString(filters)}`,
  );
}
