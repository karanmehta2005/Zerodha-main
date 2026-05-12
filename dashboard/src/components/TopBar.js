import React from "react";
import Menu from "./Menu";
import NotificationsOutline from '@mui/icons-material/NotificationsNone';

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="topbar-left">
           <span className="brand-logo-stylish" style={{ fontSize: "1.1rem" }}>
             DHAN <span className="brand-accent">SETU</span>
           </span>
      </div>

      <div className="topbar-right">
        <div className="index-container-desktop">
            {/* Desktop indices can remain subtle or be removed */}
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default TopBar;
