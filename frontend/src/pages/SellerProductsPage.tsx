const SellerProductsPage = () => {
  const productCard = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="flex flex-col h-full justify-between border rounded border-neutral-200 bg-white overflow-hidden"
    >
      <div>
        {/* Product Image Wrapper */}
        <div className="bg-slate-100 h-48 w-full flex items-center justify-center p-1 rounded-t">
          <img
            className="h-full object-contain mix-blend-multiply rounded"
            src="/ball.png"
            alt={`Product ${i + 1}`}
          />
        </div>

        {/* Product Information Body */}
        <div className="pt-1 p-2">
          <p className="font-bold">addidas</p>
          <p className="line-clamp-2">
            FIFA World Cup 26™ Trionda Host Nation League Soccer Ball
          </p>
          <div className="flex mt-4 gap-1">
            <span className="text-sm mt-1">PHP</span>
            <span className="font-semibold text-xl"> 3,500.00</span>
          </div>
        </div>
      </div>

      {/* 📦 Zero-Padding Split Action Layout Panel */}
      <div className="p-0 mt-2 flex border-t border-neutral-200">
        {/* Left Action Button: Edit Inventory */}
        <button
          onClick={() => console.log(`Edit item ${i + 1}`)}
          className="w-1/2 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-neutral-700 bg-white hover:bg-neutral-50 active:bg-neutral-100 border-r border-neutral-200 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-neutral-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          Edit
        </button>

        {/* Right Action Button: Delete Inventory */}
        <button
          onClick={() => console.log(`Delete item ${i + 1}`)}
          className="w-1/2 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-red-600 bg-white hover:bg-red-50/50 active:bg-red-50 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="pb-4">
        <h2 className="text-xl font-bold tracking-tight">Product Catalog</h2>
        <p className="text-sm mt-1 max-w-2xl">
          Manage your product listings, update inventory, and set pricing
          details.
        </p>
      </header>
      <main className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {/* max-w-7xl centers the layout cleanly on huge displays */}
        {productCard}
      </main>
    </div>
  );
};

export default SellerProductsPage;
