// AppRoutes.js
import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { IssuedCouponDt, RedeemedCouponDt, TotalCustomerDt, TotalValueDt } from "./pages/dashboard/ListingTables";
import Navbar from "./components/Navbar";
import CreateCouponDialog from "./pages/dashboard/CreateCouponDialog";
import CreatePromotionDialog from "./pages/dashboard/CreatePromotionDialog";
import SrvmeInvoice from "./components/SrvmeInvoice";

const Layout = ({ onLogout }) => {
  const location = useLocation();
  const hideNavbarOn = ["/"];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar onLogout={onLogout} />}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/issued" element={<IssuedCouponDt />} />
        <Route path="/redeemed" element={<RedeemedCouponDt />} />
        <Route path="/totalvalue" element={<TotalValueDt />} />
        <Route path="/totalcustomer" element={<TotalCustomerDt />} />
        <Route path="/createcoupon" element={<CreateCouponDialog/>} />
        <Route path="/createpromotion" element={<CreatePromotionDialog/>} />
        <Route path="/srvmeinvoice" element={<SrvmeInvoice />} />
      </Routes>
    </>
  );
};

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="*" element={<Layout onLogout={handleLogout} />} />
    </Routes>
  );
};

export default AppRoutes;
