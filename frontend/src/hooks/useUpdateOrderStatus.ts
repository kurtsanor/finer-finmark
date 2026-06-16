import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../api/order.api";


const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => 
            updateOrderStatus(orderId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["seller-orders"] });
        },
    });
};

export default useUpdateOrderStatus;

