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
    <div className="flex items-center justify-between rounded-lg border bg-white p-4">
      <button
        type="button"
        className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        {t("pagination.previous")}
      </button>

      <p className="text-sm text-slate-600">
        {t("pagination.pageOf", { page, totalPages })}
      </p>

      <button
        type="button"
        className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        {t("pagination.next")}
      </button>
    </div>
  );
}
