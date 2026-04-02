import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/features/orders/api/get-orders";

export function useOrdersQuery() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    staleTime: 1000 * 15,
  });
}
