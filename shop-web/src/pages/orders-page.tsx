import { useOrdersQuery } from "@/features/orders/model/use-orders-query";
import { EmptyState } from "@/shared/ui/empty-state";
import { OrderStatusBadge } from "@/features/orders/ui/order-status-badge";
import { useTranslation } from "react-i18next";

export function OrdersPage() {
  const { t } = useTranslation();
  const { data, isPending, isError, error } = useOrdersQuery();

  if (isPending) {
    return <p className="text-slate-600">{t("orders.loading")}</p>;
  }

  if (isError) {
    return (
      <p className="rounded border border-rose-200 bg-rose-50 p-3 text-rose-700">
        {t("orders.loadError", { message: error.message })}
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title={t("orders.emptyTitle")}
        description={t("orders.emptyDescription")}
      />
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">{t("orders.title")}</h1>

      <div className="space-y-3">
        {data.map((order) => (
          <article key={order.id} className="rounded-lg border bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{order.id}</p>
              <OrderStatusBadge status={order.status} />
            </div>

            <p className="mt-2 text-sm text-slate-600">
              {t("orders.created", {
                value: new Date(order.createdAt).toLocaleString(),
              })}
            </p>

            <p className="mt-1 text-sm text-slate-600">
              {t("orders.items", {
                count: order.items.reduce((sum, item) => sum + item.quantity, 0),
              })}
            </p>

            <p className="mt-2 text-lg font-bold">
              {t("orders.total", { value: order.totalPrice.toFixed(2) })}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
