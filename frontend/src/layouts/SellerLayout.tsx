import { Outlet } from "react-router-dom";
import SellerTopbar from "../components/SellerTopbar";
import SellerSidebar from "../components/SellerSidebar";

/**
 * SellerLayout
 * This layout wraps the seller application pages.
 * It provides a shared visual scaffold (navigation and centered content)
 * and renders the active route via the `Outlet`.
 */
const SellerLayout = () => {
  return (
    <main className="flex flex-col">
      <SellerTopbar />
      <div className="flex h-full">
        <SellerSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default SellerLayout;
