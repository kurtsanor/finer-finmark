import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import AuthLayout from "./layouts/AuthLayout";
import SignUpPage from "./pages/SignUpPage";
import MainLayout from "./layouts/MainLayout";
import OverviewPage from "./pages/OverviewPage";
import ShopPage from "./pages/ShopPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/shop" element={<ShopPage />} />
          {/* Add main application routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
