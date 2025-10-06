// AppRoutes.js
import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from './components/Login/Login';
import Dashboard from "./components/dashboard/Dashboard";
import {IssuedCouponDt, RedeemedCouponDt, TotalCustomerDt, TotalValueDt } from "./components/dashboard/ListingTables";
import Navbar from "./components/dashboard/Navbar/Navbar"
import CreateCouponDialog from "./components/dashboard/CreateCouponDialog";
import CreatePromotionDialog from "./components/dashboard/CreatePromotionDialog";
import Wallet from "./components/Wallet/Wallet";
import CouponList from "./components/dashboard/CouponList";
import CampaignList from "./components/dashboard/CampaignList";
import Footer from "./components/Footer/Footer"
import GenerateQRCode from "./components/dashboard/QRCode/GenerateQRCode";
import PrintQR from "./components/dashboard/QRCode/PrintQR";
import LoadQR from "./components/dashboard/QRCode/LoadQR";
import DialogBox from "./components/CommanComponents/DialogBox";
import LoadedQR from "./components/dashboard/QRCode/LoadedQR";
import DashboardPlus from "./components/DashboardPlus/DashboardPlus";
import DashboardPlusNavbar from "./components/DashboardPlus/Navbar/DashboardPlusNavbar";


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
        <Route path="/dashboardPlus" element={<DashboardPlus />} />
        <Route path="/dashboardPlusNavbar" element={<DashboardPlusNavbar />} />
        <Route path="/issued" element={<IssuedCouponDt />} />
        <Route path="/redeemed" element={<RedeemedCouponDt />} />
        <Route path="/totalvalue" element={<TotalValueDt />} />
        <Route path="/totalcustomer" element={<TotalCustomerDt />} />
        <Route path="/createcoupon" element={<CreateCouponDialog />} />
        <Route path="/createpromotion" element={<CreatePromotionDialog />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/couponlist" element={<CouponList />} />
        <Route path="/campaignList" element={<CampaignList />} />
        <Route path="/generateQR" element={<GenerateQRCode />} />
        <Route path="/printQR" element={<PrintQR />} />
        <Route path="/loadQR" element={<LoadQR />} />
        <Route path="/dialogbox" element={<DialogBox />} />
        <Route path="/loadedQR" element={<LoadedQR />} />
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
