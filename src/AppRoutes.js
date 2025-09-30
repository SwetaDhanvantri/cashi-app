// AppRoutes.js
import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import {IssuedCouponDt, RedeemedCouponDt, TotalCustomerDt, TotalValueDt } from "./pages/dashboard/ListingTables";
import Navbar from "./components/Navbar/Navbar";
import CreateCouponDialog from "./pages/dashboard/CreateCouponDialog";
import CreatePromotionDialog from "./pages/dashboard/CreatePromotionDialog";
import Wallet from "./components/Wallet/Wallet";
import CouponList from "./pages/dashboard/CouponList";
import CampaignList from "./pages/dashboard/CampaignList";
import Footer from "./components/Footer/Footer"


const Layout = ({ onLogout }) => {
  const location = useLocation();
  const hideNavbarOn = ["/"];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // full viewport height
      }}>
      {!shouldHideNavbar && <Navbar onLogout={onLogout} />}
      <div style={{ flex: 1 }}>
          <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/issued" element={<IssuedCouponDt />} />
        <Route path="/redeemed" element={<RedeemedCouponDt />} />
        <Route path="/totalvalue" element={<TotalValueDt />} />
        <Route path="/totalcustomer" element={<TotalCustomerDt />} />
        <Route path="/createcoupon" element={<CreateCouponDialog />} />
        <Route path="/createpromotion" element={<CreatePromotionDialog />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/couponlist" element={<CouponList />} />
        <Route path="/campaignList" element={<CampaignList />} />
      </Routes>
      </div>
    
         {!shouldHideNavbar && <Footer />} {/* Footer appears only when Navbar is shown */}
    </div>
  );
};

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('authenticated') === 'true';
   });
  const navigate = useNavigate();

  const handleLogin = () => {
    sessionStorage.setItem('authenticated', 'true');
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Layout onLogout={handleLogout} />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
