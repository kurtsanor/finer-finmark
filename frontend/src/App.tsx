import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import AuthLayout from "./layouts/AuthLayout";
import SignUpPage from "./pages/SignUpPage";
import MainLayout from "./layouts/MainLayout";
import OverviewPage from "./pages/OverviewPage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import CreateShopPage from "./pages/CreateShopPage";
import SellerLayout from "./layouts/SellerLayout";
import SellerProductsPage from "./pages/SellerProductsPage";
import CreateProductPage from "./pages/CreateProductPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerRoute from "./routes/SellerRoute";
import NotFoundPage from "./pages/NotFoundPage";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
        {/* Protected Routes for both buyer and seller (Requires authentication) */}
        <Route element={<ProtectedRoute />}>
          {/* Buyer layout and routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/create-shop" element={<CreateShopPage />} />
          </Route>
          {/* Seller centre layout and routes */}
          <Route element={<SellerRoute />}>
            <Route path="/seller-centre" element={<SellerLayout />}>
              <Route path="products" element={<SellerProductsPage />} />
              <Route path="products/new" element={<CreateProductPage />} />
              <Route path="products/:id/edit" element={<EditProductPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
