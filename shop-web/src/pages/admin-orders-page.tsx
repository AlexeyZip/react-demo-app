import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOrdersQuery } from "@/features/orders/model/use-orders-query";
import { updateOrderStatus } from "@/features/admin-orders/api/update-order-status";
import { OrderStatusBadge } from "@/features/orders/ui/order-status-badge";
import { EmptyState } from "@/shared/ui/empty-state";
import type { OrderStatus } from "@/entities/order";
import { toast } from "sonner";

const statuses: OrderStatus[] = ["pending", "paid", "shipped"];

export function AdminOrdersPage() {
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
      toast.success("Order status updated");
    },
  });

  if (isPending) {
    return <p className="text-slate-600">Loading orders...</p>;
  }

  if (isError) {
    return (
      <p className="rounded border border-rose-200 bg-rose-50 p-3 text-rose-700">
        Failed to load orders: {error.message}
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Orders will appear here after users complete checkout."
      />
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Orders</h1>

      <div className="space-y-3">
        {data.map((order) => (
          <article key={order.id} className="rounded-lg border bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{order.id}</p>
              <OrderStatusBadge status={order.status} />
            </div>

            <p className="mt-2 text-sm text-slate-600">
              Created: {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-slate-600">
              Customer: {order.customer.fullName} ({order.customer.email})
            </p>
            <p className="text-sm text-slate-600">
              Total: ${order.totalPrice.toFixed(2)}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`rounded px-3 py-1.5 text-sm ${
                    order.status === status
                      ? "bg-slate-900 text-white"
                      : "border bg-white"
                  }`}
                  onClick={() =>
                    updateStatusMutation.mutate({ orderId: order.id, status })
                  }
                  disabled={updateStatusMutation.isPending}
                >
                  Mark as {status}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
