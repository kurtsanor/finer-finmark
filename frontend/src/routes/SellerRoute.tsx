import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SellerRoute = () => {
  const { data: user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user.role != "merchant") {
    console.log("Not a merchant");

    return <Navigate to="/shop" replace />;
  }

  return <Outlet />;
};

export default SellerRoute;
