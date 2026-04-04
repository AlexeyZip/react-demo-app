import type { ProductFilters } from "@/features/products/model/types";
import { useTranslation } from "react-i18next";

interface ProductsFiltersProps {
  filters: ProductFilters;
  onChange: (next: Partial<ProductFilters>) => void;
  onReset: () => void;
}

export function ProductsFilters({
  filters,
  onChange,
  onReset,
}: ProductsFiltersProps) {
  const { t } = useTranslation();

  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-4">
        <input
          className="rounded border px-3 py-2"
          placeholder={t("filters.searchPlaceholder")}
          value={filters.q}
          onChange={(e) => onChange({ q: e.target.value })}
        />

        <select
          className="rounded border px-3 py-2"
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
        >
          <option value="">{t("filters.allCategories")}</option>
          <option value="Accessories">{t("filters.categoryAccessories")}</option>
          <option value="Displays">{t("filters.categoryDisplays")}</option>
        </select>

        <select
          className="rounded border px-3 py-2"
          value={filters.limit}
          onChange={(e) => onChange({ limit: Number(e.target.value), page: 1 })}
        >
          <option value={6}>{t("filters.perPage", { count: 6 })}</option>
          <option value={12}>{t("filters.perPage", { count: 12 })}</option>
          <option value={24}>{t("filters.perPage", { count: 24 })}</option>
        </select>

        <button
          type="button"
          className="rounded bg-slate-900 px-4 py-2 text-white"
          onClick={onReset}
        >
          {t("filters.reset")}
        </button>
      </div>
    </section>
  );
}
