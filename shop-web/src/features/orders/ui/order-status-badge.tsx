import type { OrderStatus } from "@/entities/order";
import { useTranslation } from "react-i18next";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-emerald-100 text-emerald-800",
  shipped: "bg-blue-100 text-blue-800",
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const { t } = useTranslation();

  return (
    <span
      className={`rounded px-2 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {t(`status.${status}`)}
    </span>
  );
}
