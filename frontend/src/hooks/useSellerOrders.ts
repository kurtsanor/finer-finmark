import { useQuery } from "@tanstack/react-query";
import { getSellerOrders } from "../api/order.api";
import type { Order } from "../types/order.types";

const useSellerOrders = () => {
    return useQuery<Order[]>({
        queryKey: ["seller-orders"],
        queryFn: async () => {
            const response = await getSellerOrders();
            return response.data ?? [];
        },
    });
};

export default useSellerOrders;