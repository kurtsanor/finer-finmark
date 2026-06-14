import toast from "react-hot-toast";
import { useSetCartItem } from "../hooks/useSetCartItem";
import { useProducts } from "../hooks/useProducts";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";

const ShopPage = () => {
  // controlls pagination number
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const page = Number(searchParams.get("page") || 1);

  const { data: paginationData } = useProducts(page);
  const setCartItemMutation = useSetCartItem();

  const handleAddToCart = async (productId: string) => {
    try {
      await setCartItemMutation.mutateAsync({ productId, quantity: 1 });
      toast("Added to cart!");
    } catch (error: any) {
      toast(error.response?.data?.error || "Error adding to cart");
    }
  };

  const productCard = paginationData?.data?.data?.map((product, i) => (
    <div key={product._id} className="flex flex-col h-full justify-between">
      <div>
        {/* put a background color on the wrapper container */}
        <div className="bg-slate-100 h-48 w-full flex items-center justify-center p-1 rounded">
          <img
            className="h-full object-contain mix-blend-multiply rounded"
            src={product.imageUrl || "/ball.png"}
            alt={product.name}
          />
        </div>
        <div className="pt-1 p-2">
          <p className="font-semibold">{product.shopId.name}</p>
          <p className="line-clamp-2">{product.name}</p>
          <div className="flex mt-4 gap-1">
            <span className="text-sm mt-1">PHP</span>
            <span className="font-semibold text-xl">
              {product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="p-2 pt-0 mt-2">
        <button
          onClick={() => handleAddToCart(product._id)}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-black py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 active:scale-[0.99]"
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
          Add to Cart
        </button>
      </div>
    </div>
  ));

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="pb-4">
        <h2 className="text-xl font-bold tracking-tight">
          Marketplace Catalog
        </h2>
        <p className="text-sm mt-1 max-w-2xl">
          Explore available inventory across all registered merchant stores.
          Price details and fulfillment terms are set directly by individual
          vendors.
        </p>
      </header>
      <main className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mb-10">
        {productCard}
      </main>
      <Pagination
        currentPage={page}
        totalPages={paginationData?.data?.totalPages || 1}
        onPageChange={(page) => {
          setSearchParams({ page: page.toString() });
        }}
      />
    </div>
  );
};

export default ShopPage;
