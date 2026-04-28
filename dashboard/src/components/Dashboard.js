import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import PnLReport from "./PnLReport";
import HoldingsReport from "./HoldingsReport";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import Holdings from "./Holdings";
import BottomNav from "./BottomNav";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const location = useLocation();
  const isFullWidthPage = location.pathname === "/funds" || location.pathname.startsWith("/reports");

  return (
    <GeneralContextProvider>
      <div className={`dashboard-container ${isFullWidthPage ? "no-sidebar" : ""}`}>
        {!isFullWidthPage && <WatchList />}
        <div className={`content ${isFullWidthPage ? "full-width" : ""}`}>
          <Routes>
            <Route exact path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/reports/pnl" element={<PnLReport />} />
            <Route path="/reports/holdings" element={<HoldingsReport />} />
          </Routes>
        </div>
      </div>
      <BottomNav />
    </GeneralContextProvider>
  );
};

export default Dashboard;
