import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";
import toast from "react-hot-toast";

const Topbar = () => {
  const { data: user } = useAuth();
  const logoutMutation = useLogout();

  const navigate = useNavigate();

  /**
   * Handles user logout by calling the logout mutation and providing feedback via toast notifications.
   */
  const handleLogout = async () => {
    try {
      const response = await logoutMutation.mutateAsync();
      console.log("Logout response: ", response);
      toast("You have been logged out.");

      // Navigate cleanly back to login page
      navigate("/sign-in");
    } catch (error: any) {
      toast(error.response?.data?.error || "Failed to logout.");
      console.error("Logout error: ", error.response);
    }
  };

  return (
    <div className="flex justify-between items-center bg-black h-15 px-5 sticky top-0 z-999">
      {/* Left side: logo and title */}
      <Link className="flex gap-1 mr-4" to="/">
        <img className="size-9" src="/finmark_logo.png" alt="FinMark Logo" />
        <p className="text-white text-2xl font-bold">FinMark</p>
      </Link>

      {/* Search */}
      <aside className="flex-1 max-w-4xl">
        <input
          className="w-full bg-white p-2 rounded placeholder:text-slate-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search FinMark"
        />
      </aside>

      {/* Right side: action buttons */}
      <aside className="flex items-center gap-6 ml-4">
        <Link
          to={
            user?.role === "customer"
              ? "/create-shop"
              : "/seller-centre/products"
          }
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
          {user?.role === "customer" ? "Start Selling" : "My Shop"}
        </Link>

        {/* Shopping Cart Button */}
        <Link
          to="/cart"
          className="text-white hover:text-slate-300 transition-colors cursor-pointer"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 40 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66666 1.5H8.33332L12.8 21.585C12.9524 22.2756 13.3698 22.8959 13.9792 23.3374C14.5886 23.779 15.3512 24.0135 16.1333 24H32.3333C33.1155 24.0135 33.878 23.779 34.4874 23.3374C35.0968 22.8959 35.5142 22.2756 35.6667 21.585L38.3333 9H9.99999M16.6667 31.5C16.6667 32.3284 15.9205 33 15 33C14.0795 33 13.3333 32.3284 13.3333 31.5C13.3333 30.6716 14.0795 30 15 30C15.9205 30 16.6667 30.6716 16.6667 31.5ZM35 31.5C35 32.3284 34.2538 33 33.3333 33C32.4128 33 31.6667 32.3284 31.6667 31.5C31.6667 30.6716 32.4128 30 33.3333 30C34.2538 30 35 30.6716 35 31.5Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* Notifications Button */}
        <button className="text-white hover:text-slate-300 transition-colors cursor-pointer">
          <svg
            width="25"
            height="25"
            viewBox="0 0 42 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.4955 36.4248C24.1072 36.9931 23.55 37.4648 22.8795 37.7927C22.209 38.1206 21.4488 38.2932 20.675 38.2932C19.9013 38.2932 19.1411 38.1206 18.4706 37.7927C17.8001 37.4648 17.2429 36.9931 16.8546 36.4248M33.9251 12.0498C33.9251 9.06612 32.5291 6.20464 30.0442 4.09485C27.5594 1.98507 24.1892 0.799805 20.675 0.799805C17.1609 0.799805 13.7907 1.98507 11.3059 4.09485C8.82103 6.20464 7.42505 9.06612 7.42505 12.0498C7.42505 25.1748 0.800049 28.9248 0.800049 28.9248H40.5501C40.5501 28.9248 33.9251 25.1748 33.9251 12.0498Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* User Profile */}
        <Link
          to="#"
          className="flex items-center gap-3 border-l border-white/20 pl-4"
        >
          <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-semibold">
            {user?.firstName?.charAt(0).toUpperCase() ?? "U"}
          </div>

          <div className="hidden md:flex flex-col leading-none">
            <span className="text-white text-sm font-medium">
              {user?.firstName}
            </span>
            <span className="text-slate-300 text-xs">
              {user?.role === "merchant" ? "Merchant" : "Customer"}
            </span>
          </div>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-white hover:text-red-300 transition-colors cursor-pointer"
          aria-label="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3-3H9m0 0 3-3m-3 3 3 3"
            />
          </svg>
        </button>
      </aside>
    </div>
  );
};

export default Topbar;
