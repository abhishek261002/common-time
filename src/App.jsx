import { Routes, Route, Navigate, useParams } from "react-router-dom";

function MerchRedirect() {
  const { id } = useParams();
  return <Navigate to={`/shop/${id}`} replace />;
}
import Home from "./pages/Home.jsx";
import TermsPage from "./pages/Terms.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/merch" element={<Navigate to="/shop" replace />} />
          <Route path="/merch/:id" element={<MerchRedirect />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
