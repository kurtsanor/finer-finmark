import { Link } from "react-router-dom";

const SellerTopbar = () => {
  return (
    <div className="flex justify-between items-center bg-black h-15 px-5 sticky top-0 z-999">
      {/* Left side: logo and title */}
      <Link className="flex gap-1" to="/">
        <img className="size-9" src="/finmark_logo.png" alt="FinMark Logo" />
        <p className="text-white text-2xl font-bold">FinMark</p>
        <div className="flex items-center ml-2">
          <p className="text-neutral-200 text-xl font-semibold tracking-tighter">
            Seller Centre
          </p>
        </div>
      </Link>

      {/* Right side: action buttons */}
      <aside className="flex items-center gap-6">
        <Link
          to="/shop"
          className="flex items-center gap-1.5 border border-white/40 hover:border-white text-white text-sm font-semibold px-3 py-1.5 tracking-tight rounded transition-all hover:bg-white hover:text-black active:scale-[0.98]"
        >
          {/* Subtle Store Front Layout Icon */}
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
              d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
            />
          </svg>
          Back to shopping
        </Link>
      </aside>
    </div>
  );
};

export default SellerTopbar;
