import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/staticPages/HomePage";
import RegisterPage from "../pages/users/RegisterPage";
import LoginPage from "../pages/users/LoginPage";
import ResetPasswordPage from "../pages/users/ResetPasswordPage";
import EditPasswordPage from "../pages/users/EditPasswordPage";
import ShowCart from "../pages/users/ShowCart";
import AdminPage from "../pages/AdminPage";
import AddProductForm from "./forms/AddProductForm";
import EditProductForm from "./forms/EditProductForm";
import LegumesPage from "../pages/products/LegumesPage";
import FruitsPage from "../pages/products/FruitsPage";
import ProductsPage from "../pages/products/ProductsPage";
import SuccessPayment from "../pages/SuccessPayment";
import NotFoundPage from "../pages/staticPages/NotFoundPage";
import NavBar from "./NavBar";
import Footer from "./Footer";
import UserPage from "../pages/users/UserPage";
import CguCgv from "../pages/staticPages/CguCgv";
import LegalNotice from "../pages/staticPages/LegalNotice";
import PrivacyPolicy from "../pages/staticPages/PrivacyPolicy";
import PanierPage from "../pages/products/PaniersPage";
function AppRoutes() {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password/reset" element={<ResetPasswordPage />} />
        <Route path="/users/password/edit" element={<EditPasswordPage />} />
        <Route path="/cart" element={<ShowCart />} />
        <Route path="/products" element={<ProductsPage />} />
        {isAdmin && (
          <>
            <Route path="/admin/page" element={<AdminPage />} />
            <Route path="/admin/products/add" element={<AddProductForm />} />
            <Route path="/admin/products/edit/:productId" element={<EditProductForm />} />
          </>
        )}
        <Route path="/legumes" element={<LegumesPage />} />
        <Route path="/fruits" element={<FruitsPage />} />
        <Route path="/paniers" element={<PanierPage />} />
        <Route path="/payment/success" element={<SuccessPayment />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/profil" element={<UserPage />} />
        <Route path="/cgu-cgv" element={<CguCgv />} />
        <Route path="/legal-notice" element={<LegalNotice />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default AppRoutes;
