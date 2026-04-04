import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOrdersQuery } from "@/features/orders/model/use-orders-query";
import { updateOrderStatus } from "@/features/admin-orders/api/update-order-status";
import { OrderStatusBadge } from "@/features/orders/ui/order-status-badge";
import { EmptyState } from "@/shared/ui/empty-state";
import type { OrderStatus } from "@/entities/order";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const statuses: OrderStatus[] = ["pending", "paid", "shipped"];

export function AdminOrdersPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useOrdersQuery();

  const updateStatusMutation = useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatus;
    }) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(t("adminOrders.statusUpdatedToast"));
    },
  });

  if (isPending) {
    return <p className="text-slate-600 dark:text-slate-300">{t("adminOrders.loading")}</p>;
  }

  if (isError) {
    return (
      <p className="rounded border border-rose-200 bg-rose-50 p-3 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
        {t("adminOrders.loadError", { message: error.message })}
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title={t("adminOrders.emptyTitle")}
        description={t("adminOrders.emptyDescription")}
      />
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">{t("adminOrders.title")}</h1>

      <div className="space-y-3">
        {data.map((order) => (
          <article key={order.id} className="rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{order.id}</p>
              <OrderStatusBadge status={order.status} />
            </div>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {t("adminOrders.created", {
                value: new Date(order.createdAt).toLocaleString(),
              })}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t("adminOrders.customer", {
                name: order.customer.fullName,
                email: order.customer.email,
              })}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t("adminOrders.total", { value: order.totalPrice.toFixed(2) })}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`rounded px-3 py-1.5 text-sm ${
                    order.status === status
                      ? "bg-slate-900 text-white"
                      : "border bg-white dark:border-slate-700 dark:bg-slate-900"
                  }`}
                  onClick={() =>
                    updateStatusMutation.mutate({ orderId: order.id, status })
                  }
                  disabled={updateStatusMutation.isPending}
                >
                  {t("adminOrders.markAs", { status: t(`status.${status}`) })}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
