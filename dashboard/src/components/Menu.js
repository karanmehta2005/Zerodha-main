import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsMobileMenuOpen(false); // Close mobile menu on navigate
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <div className="logo-section">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="brand-logo-stylish">
            DHAN <span className="brand-accent">SETU</span>
          </span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>


      <div className={`menus ${isMobileMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
        </ul>
        <hr className="menu-divider" />
        <div className="profile" style={{ position: "relative" }} onClick={handleProfileClick}>
          <div className="avatar">Profile</div>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown" style={{
              position: 'absolute',
              top: '50px',
              right: '0',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '10px 20px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              zIndex: 1000
            }}>
              <div style={{ paddingBottom: "10px", borderBottom: "1px solid #eee", marginBottom: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <Link to="/reports/pnl" onClick={() => setIsProfileDropdownOpen(false)} style={{ textDecoration: "none", color: "#444", fontSize: "14px", fontWeight: "500" }}>P&L Report</Link>
                <Link to="/reports/holdings" onClick={() => setIsProfileDropdownOpen(false)} style={{ textDecoration: "none", color: "#444", fontSize: "14px", fontWeight: "500" }}>Holdings Report</Link>
              </div>
              <button 
                onClick={() => {
                  localStorage.removeItem("userEmail");
                  window.location.href = "http://localhost:3003/";
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#df5148',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Menu;
