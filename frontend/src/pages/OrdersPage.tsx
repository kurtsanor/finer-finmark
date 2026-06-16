import useMyOrders from "../hooks/useMyOrders";
import type { OrderStatus } from "../types/order.types";

const STATUS_STEPS: OrderStatus[] = ["placed", "confirmed", "shipped", "delivered"];

const STATUS_LABEL: Record<OrderStatus, string> = {
  placed: "Placed",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  placed: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
};

const OrdersPage = () => {
  const { data: orders = [], isLoading } = useMyOrders();

  if (isLoading) return <p className="p-4">Loading orders...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="pb-4">
        <h2 className="text-xl font-bold tracking-tight">My Orders</h2>
        <p className="text-sm mt-1">Track the status of your orders from placement to delivery.</p>
      </header>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 py-20">You have no orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const currentStep = STATUS_STEPS.indexOf(order.status);
            return (
              <div key={order._id} className="border border-neutral-200 p-5 rounded">
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-neutral-500">
                      Order placed {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-neutral-400 font-mono">{order._id}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLOR[order.status]}`}>
                    {STATUS_LABEL[order.status]}
                  </span>
                </div>

                {/* Progress tracker */}
                <div className="flex items-center mb-5">
                  {STATUS_STEPS.map((step, i) => (
                    <div key={step} className="flex items-center flex-1 last:flex-none">
                      <div
                        className={`w-3 h-3 rounded-full shrink-0 ${
                          i <= currentStep ? "bg-black" : "bg-neutral-300"
                        }`}
                      />
                      {i < STATUS_STEPS.length - 1 && (
                        <div
                          className={`h-0.5 flex-1 ${
                            i < currentStep ? "bg-black" : "bg-neutral-300"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mb-5">
                  {STATUS_STEPS.map((step) => (
                    <span key={step} className="text-xs text-neutral-500">
                      {STATUS_LABEL[step]}
                    </span>
                  ))}
                </div>

                {/* Items */}
                <div className="flex flex-col gap-2 border-t border-neutral-100 pt-3">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        PHP {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total + shipping */}
                <div className="flex justify-between items-start mt-4 pt-3 border-t border-neutral-100">
                  <div className="text-sm text-neutral-500">
                    <p>{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                    <p>{order.shippingAddress.postalCode} · {order.shippingAddress.phoneNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Total</p>
                    <p className="font-bold">PHP {order.totalAmount.toFixed(2)}</p>
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

export default OrdersPage;
