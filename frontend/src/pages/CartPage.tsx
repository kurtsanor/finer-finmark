import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NumberStepper from "../components/NumberStepper";
import { useCart } from "../hooks/useCart";
import { useSetCartItem } from "../hooks/useSetCartItem";
import { useDeleteCartItem } from "../hooks/useDeleteCartItem";

const CartPage = () => {
  const navigate = useNavigate();
  const { data: items = [], isLoading, error } = useCart();
  const cartItemMutation = useSetCartItem();
  const removeItemMutation = useDeleteCartItem();

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number,
  ) => {
    try {
      await cartItemMutation.mutateAsync({ productId, quantity: newQuantity });
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      toast("Failed to update cart item. Please try again.");
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeItemMutation.mutateAsync(productId);
      toast("Item removed from cart.");
    } catch (error) {
      console.error("Error removing cart item:", error);
      toast("Failed to remove item from cart. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading cart...</p>;
  }

  console.log(items);

  const cartItems = items?.map((item, i) => (
    <div key={item.productId._id} className="flex gap-4 py-2">
      {/* put a background color on the wrapper container */}
      <div className="bg-slate-100 h-40 w-40 flex items-center justify-center p-1 rounded">
        <img
          className="h-full object-contain mix-blend-multiply rounded"
          src="/ball.png" // Even if this has a solid white BG, it will blend away
          alt={item.productId._id}
        />
      </div>
      <div className="flex justify-between gap-10 flex-1">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.productId.shopId.name}</h3>
          <p className="line-clamp-2 mb-5">{item.productId.name}</p>
          <NumberStepper
            value={item.quantity}
            onChange={(newQuantity) =>
              handleQuantityChange(item.productId._id, newQuantity)
            }
            min={1}
          />
        </div>
        <aside className="flex flex-col items-end">
          <p className="text-lg font-bold ">
            PHP {item.productId.price.toFixed(2)}
          </p>
          <button
            onClick={() => handleRemoveItem(item.productId._id)}
            className="mt-3 transition-colors text-neutral-500 hover:text-red-600 w-fit hover:bg-red-100 rounded p-2"
            aria-label="Remove item"
          >
            <img src="/trash.png" alt="Remove" className="w-5 h-5" />
          </button>
        </aside>
      </div>
    </div>
  ));

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="pb-4">
        <h2 className="text-xl font-bold tracking-tight">Shopping Cart</h2>
        <p className="text-sm mt-1 max-w-2xl">
          Review items in your cart, adjust quantities, and proceed to checkout
          when ready.
        </p>
      </header>
      <div className="flex gap-10">
        <main className="flex-1 flex flex-col">
          {items.length > 0 ? (
            <>{cartItems}</>
          ) : (
            <p className="text-center text-gray-500 py-20">
              Your cart is empty.
            </p>
          )}
        </main>
        <aside className="border border-neutral-300 w-80 h-fit rounded">
          <div className="p-4">
            <h3 className="text-lg">Subtotal</h3>
            <p className="text-lg font-bold">
              ({items.length} item/s): PHP{" "}
              {items
                .reduce(
                  (total, item) => total + item.productId.price * item.quantity,
                  0,
                )
                .toFixed(2)}
            </p>
            <button
              disabled={items.length === 0}
              onClick={() => navigate("/checkout")}
              className="w-full flex items-center disabled:opacity-50 disabled:hover:bg-black justify-center gap-2 rounded-lg bg-black py-2 mt-5 font-semibold text-white transition-colors hover:bg-slate-800 active:scale-[0.99]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Checkout Items
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
