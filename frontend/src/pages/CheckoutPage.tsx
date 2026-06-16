import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutSchema, type CheckoutFormData } from "../schemas/checkout";
import { createOrder } from "../api/order.api";
import { useCart } from "../hooks/useCart";
import { Button } from "../components/Button";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: items = [] } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingAddress: {
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
      },
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CheckoutFormData) => createOrder(data.shippingAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      toast("Order placed successfully!");
      navigate("/orders");
    },
    onError: (error: any) => {
      toast(error.response?.data?.error || "Failed to place order");
    },
  });

  const total = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  const fields: { id: keyof CheckoutFormData["shippingAddress"]; label: string; placeholder: string }[] = [
    { id: "fullName", label: "Full Name", placeholder: "Juan dela Cruz" },
    { id: "address", label: "Address", placeholder: "123 Rizal St, Barangay 1" },
    { id: "city", label: "City", placeholder: "Manila" },
    { id: "postalCode", label: "Postal Code", placeholder: "1000" },
    { id: "phoneNumber", label: "Phone Number", placeholder: "09XX XXX XXXX" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="pb-4">
        <h2 className="text-xl font-bold tracking-tight">Checkout</h2>
        <p className="text-sm mt-1">Enter your shipping details to complete your order.</p>
      </header>

      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className="flex gap-10"
      >
        {/* Shipping form */}
        <main className="flex-1 flex flex-col gap-1 border border-neutral-200 p-5 h-fit">
          <h3 className="font-semibold text-base mb-2">Shipping Information</h3>
          {fields.map(({ id, label, placeholder }) => (
            <div key={id} className="flex flex-col mb-3">
              <label htmlFor={id} className="text-sm font-medium mb-1">
                {label}
              </label>
              <input
                {...register(`shippingAddress.${id}`)}
                id={id}
                placeholder={placeholder}
                className="border border-neutral-200 px-3 py-1.5 tracking-tight bg-neutral-50"
              />
              {errors.shippingAddress?.[id] && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.shippingAddress[id]?.message}
                </span>
              )}
            </div>
          ))}
        </main>

        {/* Order summary */}
        <aside className="border border-neutral-300 w-80 h-fit rounded">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
            <div className="flex flex-col gap-2 mb-4">
              {items.map((item) => (
                <div key={item.productId._id} className="flex justify-between text-sm">
                  <span className="line-clamp-1 flex-1 pr-2">
                    {item.productId.name} × {item.quantity}
                  </span>
                  <span className="shrink-0">
                    PHP {(item.productId.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-200 pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span>PHP {total.toFixed(2)}</span>
            </div>
            <Button
              type="submit"
              isLoading={isSubmitting || mutation.isPending}
              loadingText="Placing order..."
              className="w-full bg-black hover:bg-neutral-900 text-white py-2 mt-5 tracking-tight transition-colors"
            >
              Place Order
            </Button>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default CheckoutPage;
