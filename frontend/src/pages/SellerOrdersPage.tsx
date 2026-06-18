import toast from "react-hot-toast";
import useSellerOrders from "../hooks/useSellerOrders";
import useUpdateOrderStatus from "../hooks/useUpdateOrderStatus";
import { getCountryConfig } from "../constants/seaCountries";
import type { OrderStatus } from "../types/order.types";

const STATUS_COLOR: Record<OrderStatus, string> = {
  placed: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
};

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  placed: "confirmed",
  confirmed: "shipped",
  shipped: "delivered",
};

const NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
  placed: "Confirm Order",
  confirmed: "Mark as Shipped",
  shipped: "Mark as Delivered",
};

const SellerOrdersPage = () => {
  const { data: orders = [], isLoading } = useSellerOrders();
  const updateStatus = useUpdateOrderStatus();

  const handleAdvance = async (orderId: string, current: OrderStatus) => {
    const next = NEXT_STATUS[current];

    if (!next) return;

    try {
      await updateStatus.mutateAsync({
        orderId,
        status: next,
      });

      toast.success(`Order marked as ${next}`);
    } catch {
      toast.error("Failed to update order status");
    }
  };

  if (isLoading) return <>Loading orders...</>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="pb-4">
        <h2 className="text-xl font-bold tracking-tight">Incoming Orders</h2>
        <p className="text-sm mt-1">
          Manage and fulfil orders from your customers.
        </p>
      </header>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const shopOrder = order.shopOrders?.[0];

            if (!shopOrder) return null;

            return (
              <div
                key={order._id}
                className="border border-neutral-200 p-5 rounded"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-neutral-700">
                      {shopOrder.shopId.name}
                    </p>

                    <p className="text-xs text-neutral-500">
                      {new Date(order.createdAt).toLocaleDateString("en-PH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>

                    <p className="text-xs text-neutral-400 font-mono">
                      {order._id}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      STATUS_COLOR[shopOrder.status]
                    }`}
                  >
                    {shopOrder.status.charAt(0).toUpperCase() +
                      shopOrder.status.slice(1)}
                  </span>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-1 border-t border-neutral-100 pt-3 mb-3">
                  {shopOrder.items.map((item) => (
                    <div
                      key={item.product}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span className="font-medium">
                        PHP {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping + Total + Action */}
                <div className="flex items-end justify-between pt-3 border-t border-neutral-100">
                  <div className="text-sm text-neutral-500">
                    <p className="font-medium text-neutral-700">
                      {order.shippingAddress.fullName}
                    </p>

                    <p>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {getCountryConfig(order.shippingAddress.country)?.name ??
                        order.shippingAddress.country}
                    </p>

                    <p>
                      {order.shippingAddress.postalCode} ·{" "}
                      {order.shippingAddress.phoneNumber}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="font-bold text-sm">
                      PHP {shopOrder.subtotal.toFixed(2)}
                    </p>

                    {NEXT_STATUS[shopOrder.status] && (
                      <button
                        onClick={() =>
                          handleAdvance(order._id, shopOrder.status)
                        }
                        disabled={updateStatus.isPending}
                        className="text-sm bg-black text-white px-3 py-1.5 rounded hover:bg-neutral-800 transition-colors disabled:opacity-50"
                      >
                        {NEXT_LABEL[shopOrder.status]}
                      </button>
                    )}

                    {shopOrder.status === "delivered" && (
                      <span className="text-xs text-green-600 font-medium">
                        Fulfilled
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SellerOrdersPage;
