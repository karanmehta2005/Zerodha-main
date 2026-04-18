import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { stockDescriptions, stockStats } from "../data/stockData";
import "./StockDetails.css";

const StockDetails = ({ uid }) => {
  const { closeDetailsWindow } = useContext(GeneralContext);
  const description = stockDescriptions[uid] || "Company details not available.";
  const stats = stockStats[uid] || { yesterday: "--", volume: "--" };

  return (
    <div className="details-overlay">
      <div className="details-window">
        <div className="hero-header">
          <h3>{uid}</h3>
          <button onClick={closeDetailsWindow} className="close-btn">
            <CloseIcon fontSize="medium" />
          </button>
        </div>
        
        <div className="window-content">
          <div className="content-section">
            <h5><InfoOutlinedIcon fontSize="inherit" /> About the Company</h5>
            <p>{description}</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span className="label"><TrendingUpIcon fontSize="inherit" /> Yesterday Close</span>
              <span className="value positive">₹{stats.yesterday}</span>
            </div>
            <div className="stat-card">
              <span className="label"><BarChartIcon fontSize="inherit" /> Trading Volume</span>
              <span className="value neutral">{stats.volume}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
