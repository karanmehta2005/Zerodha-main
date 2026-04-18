import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import "./BottomNav.css";

const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="bottom-nav">
      <Link to="/" className={`nav-link ${path === "/" ? "active" : ""}`}>
        <HomeIcon />
        <span>Home</span>
      </Link>
      <Link to="/watchlist" className={`nav-link ${path === "/watchlist" ? "active" : ""}`}>
        <StarBorderIcon />
        <span>Watchlist</span>
      </Link>
      <Link to="/holdings" className={`nav-link ${path === "/holdings" || path === "/positions" ? "active" : ""}`}>
        <BusinessCenterIcon />
        <span>Portfolio</span>
      </Link>
      <Link to="/orders" className={`nav-link ${path === "/orders" ? "active" : ""}`}>
        <ListAltIcon />
        <span>Orders</span>
      </Link>
      <Link to="/funds" className={`nav-link ${path === "/funds" ? "active" : ""}`}>
        <AccountBalanceWalletIcon />
        <span>Account</span>
      </Link>
    </div>
  );
};

export default BottomNav;
