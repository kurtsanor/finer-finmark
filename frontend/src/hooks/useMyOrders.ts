import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../api/order.api";
import type { Order } from "../types/order.types";

const useMyOrders = () => {
    return useQuery<Order[]>({
        queryKey: ["my-orders"],
        queryFn: async () => {
            const response = await getMyOrders();
            return response.data ?? [];
        },
    });
};

export default useMyOrders;