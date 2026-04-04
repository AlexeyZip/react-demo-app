export function ProductCardSkeleton() {
  return (
    <article className="animate-pulse rounded-lg border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 h-40 w-full rounded bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-2">
        <div className="h-5 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-2 h-5 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </article>
  );
}
