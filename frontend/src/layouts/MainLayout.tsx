import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

/**
 * MainLayout
 * This layout wraps the main application pages.
 * It provides a shared visual scaffold (navigation and centered content)
 * and renders the active route via the `Outlet`.
 */
const MainLayout = () => {
  return (
    <main className="flex flex-col">
      <Topbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
