import NumberStepper from "../components/NumberStepper";

const CartPage = () => {
  const cartItems = Array.from({ length: 3 }, (_, i) => (
    <div key={i} className="flex gap-4 py-2">
      {/* put a background color on the wrapper container */}
      <div className="bg-slate-100 h-40 w-40 flex items-center justify-center p-1 rounded">
        <img
          className="h-full object-contain mix-blend-multiply rounded"
          src="/ball.png" // Even if this has a solid white BG, it will blend away
          alt={`Product ${i + 1}`}
        />
      </div>
      <div className="flex justify-between gap-10 flex-1">
        <div>
          <h3 className="font-medium">addidas</h3>
          <p className="line-clamp-2 mb-5">
            FIFA World Cup 26™ Trionda Host Nation League Soccer Ball
          </p>
          <NumberStepper
            value={1}
            onChange={(newValue) => console.log("New quantity:", newValue)}
            min={1}
          />
        </div>
        <p className="text-lg font-bold ">PHP1,530</p>
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
          {cartItems.length > 0 ? (
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
            <p className="text-lg font-bold">(1 item): PHP 1,530.18</p>
            <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-black py-2 mt-5 font-semibold text-white transition-colors hover:bg-slate-800 active:scale-[0.99]">
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
