import type { ProductFilters } from "@/features/products/model/types";

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
  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-4">
        <input
          className="rounded border px-3 py-2"
          placeholder="Search by title or description..."
          value={filters.q}
          onChange={(e) => onChange({ q: e.target.value })}
        />

        <select
          className="rounded border px-3 py-2"
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
        >
          <option value="">All categories</option>
          <option value="Accessories">Accessories</option>
          <option value="Displays">Displays</option>
        </select>

        <select
          className="rounded border px-3 py-2"
          value={filters.limit}
          onChange={(e) => onChange({ limit: Number(e.target.value), page: 1 })}
        >
          <option value={6}>6 per page</option>
          <option value={12}>12 per page</option>
          <option value={24}>24 per page</option>
        </select>

        <button
          type="button"
          className="rounded bg-slate-900 px-4 py-2 text-white"
          onClick={onReset}
        >
          Reset filters
        </button>
      </div>
    </section>
  );
}
