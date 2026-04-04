import type { Product } from "@/entities/product/model/types";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { t } = useTranslation();

  return (
    <article className="rounded-lg border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="mb-3 h-40 w-full rounded object-cover"
      />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          <span
            className={`text-sm ${
              product.inStock ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {product.inStock ? t("product.inStock") : t("product.outOfStock")}
          </span>
        </div>

        <button
          type="button"
          className="mt-2 w-full rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
          disabled={!product.inStock}
          onClick={() => onAddToCart(product)}
        >
          {t("product.addToCart")}
        </button>
      </div>
    </article>
  );
}
