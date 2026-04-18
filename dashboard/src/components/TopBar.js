import React from "react";
import Menu from "./Menu";
import NotificationsOutline from '@mui/icons-material/NotificationsNone';

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="topbar-left">
           <img src="logo.png" style={{ width: "24px" }} alt="Logo" />
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
