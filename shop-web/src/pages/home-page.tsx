import { ProductCard, ProductCardSkeleton } from "@/entities/product";
import { ProductsFilters } from "@/features/products/ui/products-filters";
import { ProductsPagination } from "@/features/products/ui/products-pagination";
import { useProductFilters } from "@/features/products/model/use-product-filters";
import { useProductsQuery } from "@/features/products/model/use-products-query";
import { useDebouncedValue } from "@/shared/lib/use-debounced-value";
import { EmptyState } from "@/shared/ui/empty-state";
import { useAppDispatch } from "@/app/store/hooks";
import { addItem } from "@/features/cart/model/cart-slice";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation();
  const { filters, setFilters, resetFilters } = useProductFilters();
  const debouncedQ = useDebouncedValue(filters.q, 400);
  const dispatch = useAppDispatch();

  const { data, isPending, isError, error, isFetching } = useProductsQuery({
    ...filters,
    q: debouncedQ,
  });

  const handleFiltersChange = (next: Partial<typeof filters>) => {
    const shouldResetPage = "q" in next || "category" in next;
    setFilters({
      ...next,
      page: shouldResetPage ? 1 : (next.page ?? filters.page),
    });
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">{t("catalog.title")}</h1>

      <ProductsFilters
        filters={filters}
        onChange={handleFiltersChange}
        onReset={resetFilters}
      />

      {isFetching ? (
        <p
          role="status"
          aria-live="polite"
          className="text-sm text-slate-500 dark:text-slate-400"
        >
          {t("catalog.updating")}
        </p>
      ) : null}

      {isError ? (
        <p
          role="alert"
          className="rounded border border-rose-200 bg-rose-50 p-3 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
        >
          {t("catalog.loadError", { message: error.message })}
        </p>
      ) : null}

      {isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: filters.limit }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      ) : null}

      {!isPending && !isError && (!data || data.items.length === 0) ? (
        <EmptyState
          title={t("catalog.emptyTitle")}
          description={t("catalog.emptyDescription")}
        />
      ) : null}

      {!isPending && !isError && data?.items.length ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(nextProduct) => dispatch(addItem(nextProduct))}
              />
            ))}
          </div>

          <ProductsPagination
            page={data.page}
            totalPages={data.totalPages}
            onPageChange={(nextPage) => setFilters({ page: nextPage })}
          />
        </>
      ) : null}
    </section>
  );
}
