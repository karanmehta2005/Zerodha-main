import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import Holdings from "./Holdings";
import BottomNav from "./BottomNav";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const location = useLocation();
  const isFundsPage = location.pathname === "/funds";

  return (
    <GeneralContextProvider>
      <div className={`dashboard-container ${isFundsPage ? "no-sidebar" : ""}`}>
        {!isFundsPage && <WatchList />}
        <div className={`content ${isFundsPage ? "full-width" : ""}`}>
          <Routes>
            <Route exact path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
          </Routes>
        </div>
      </div>
      <BottomNav />
    </GeneralContextProvider>
  );
};

export default Dashboard;
