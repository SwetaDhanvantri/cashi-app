import { useState } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Login from './components/Login/Login';

// 🧭 Dashboard Components
import Dashboard from "./components/dashboard/Dashboard";
import {
  IssuedCouponDt,
  RedeemedCouponDt,
  TotalCustomerDt,
  TotalValueDt,
} from "./components/dashboard/ListingTables";
import Navbar from "./components/dashboard/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CreateCouponDialog from "./components/dashboard/CreateCouponDialog";
import CreatePromotionDialog from "./components/dashboard/CreatePromotionDialog";
import Wallet from "./components/Wallet/Wallet";
import CouponList from "./components/dashboard/CouponList";
import CampaignList from "./components/dashboard/CampaignList";

import DialogBox from "./components/CommanComponents/DialogBox";


// 🌟 Dashboard Plus Components
import DashboardPlus from "./components/DashboardPlus/DashboardPlus";
import DashboardPlusNavbar from "./components/DashboardPlus/Navbar/DashboardPlusNavbar";
import { ActivatedQrDt, GeneratedQRDt, LoadedORDt, TotalCustomerPlusDt } from "./components/DashboardPlus/ListingTablesPlus";
import DashboardCommanPlus from "./components/DashboardPlus/DashboardCommanPlus";
import LoadQR from "./components/DashboardPlus/QRCode/LoadQR";
import GenerateQRCode from "./components/DashboardPlus/QRCode/GenerateQRCode";
import PrintQR from "./components/DashboardPlus/QRCode/PrintQR";

// ------------------------------------------------------------------
// MAIN DASHBOARD LAYOUT
// ------------------------------------------------------------------
const DashboardLayout = ({ onLogout }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar onLogout={onLogout} />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="issued" element={<IssuedCouponDt />} />
          <Route path="redeemed" element={<RedeemedCouponDt />} />
          <Route path="totalvalue" element={<TotalValueDt />} />
          <Route path="totalcustomer" element={<TotalCustomerDt />} />
          <Route path="createcoupon" element={<CreateCouponDialog />} />
          <Route path="createpromotion" element={<CreatePromotionDialog />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="couponlist" element={<CouponList />} />
          <Route path="campaignList" element={<CampaignList />} />
          
          <Route path="dialogbox" element={<DialogBox />} />
         
          {/* Add redirect for base /dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

// ------------------------------------------------------------------
// DASHBOARD PLUS LAYOUT
// ------------------------------------------------------------------
const DashboardPlusLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <DashboardPlusNavbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="" element={<DashboardPlus />} />
        
          <Route path="generatedQRdt" element={<GeneratedQRDt />} /> 
          <Route path="generateQR" element={<GenerateQRCode/>} /> 
          <Route path="loadQR/printQR" element={<PrintQR/>} /> 
          <Route path="loadQR" element={<LoadQR />} /> 
          <Route path="loadedQRdt" element={<LoadedORDt />} /> 
          <Route path="activatedQRdt" element={<ActivatedQrDt />} /> 
          <Route path="dashboardCommanPlus" element={<DashboardCommanPlus />} /> 
          <Route path="totalCustomerPlusDt" element={<TotalCustomerPlusDt />} /> 
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

// ------------------------------------------------------------------
// APP ROUTES
// ------------------------------------------------------------------
const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("authenticated") === "true"
  );
  const navigate = useNavigate();

  const handleLogin = () => {
    sessionStorage.setItem("authenticated", "true");
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.clear();
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Login onLogin={handleLogin} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Default Dashboard Layout */}
      <Route path="/*" element={<DashboardLayout onLogout={handleLogout} />} />

      {/* Dashboard Plus Layout */}
      <Route path="/dashboardPlus/*" element={<DashboardPlusLayout />} />
    </Routes>
  );
};

export default AppRoutes;
