import { useTranslation } from "react-i18next";

interface ProductsPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
}

export function ProductsPagination({
  page,
  totalPages,
  onPageChange,
}: ProductsPaginationProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label={t("a11y.paginationPrevious")}
      >
        {t("pagination.previous")}
      </button>

      <p className="text-sm text-slate-600 dark:text-slate-300">
        {t("pagination.pageOf", { page, totalPages })}
      </p>

      <button
        type="button"
        className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label={t("a11y.paginationNext")}
      >
        {t("pagination.next")}
      </button>
    </div>
  );
}
