import { Outlet } from "react-router-dom";
import AuthNav from "../components/AuthNav";

/**
 * AuthLayout
 * This layout wraps authentication pages (Sign In / Sign Up).
 * It provides a shared visual scaffold (navigation and centered form)
 * and renders the active auth route via the `Outlet`.
 */
const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen items-center sm:p-5 justify-center bg-white/50 bg-[linear-gradient(#f9f9f9_1px,transparent_1px),linear-gradient(to_right,#f9f9f9_1px,#ffffff_1px)] bg-size-[54px_54px]">
      {/* Sign In & Sign Up Switch */}
      <AuthNav />
      {/* Inner Form */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
