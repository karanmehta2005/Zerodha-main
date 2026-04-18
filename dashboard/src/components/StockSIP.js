import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import CloseIcon from "@mui/icons-material/Close";
import BoltIcon from "@mui/icons-material/Bolt";
import "./StockSIP.css";

const StockSIP = ({ uid, price }) => {
  const { closeSIPWindow } = useContext(GeneralContext);
  const [amount, setAmount] = useState(5000);
  const [day, setDay] = useState(5);

  const handleSetupSIP = () => {
    alert(`SIP Setup for ${uid}: ₹${amount} monthly on day ${day}`);
    closeSIPWindow();
  };

  return (
    <div className="sip-overlay">
      <div className="sip-window floating-window premium-theme">
        <div className="window-header">
          <div className="title-section">
            <BoltIcon className="sip-bolt" />
            <h3>Stock SIP</h3>
          </div>
          <button onClick={closeSIPWindow} className="close-btn">
            <CloseIcon fontSize="small" />
          </button>
        </div>

        <div className="sip-content">
          <div className="stock-info">
            <span className="stock-uid">{uid}</span>
            <span className="ltp">LTP: ₹{price?.toFixed(2)}</span>
          </div>

          <div className="sip-form">
            <div className="field-group">
              <label>Monthly Investment Amount</label>
              <div className="amount-input-container">
                <span className="currency">₹</span>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div className="suggestions">
                <button onClick={() => setAmount(2000)}>₹2k</button>
                <button onClick={() => setAmount(5000)}>₹5k</button>
                <button onClick={() => setAmount(10000)}>₹10k</button>
              </div>
            </div>

            <div className="field-group">
              <label>Execution Day of Month</label>
              <div className="day-selector">
                <input 
                  type="range" 
                  min="1" 
                  max="28" 
                  value={day} 
                  onChange={(e) => setDay(e.target.value)}
                />
                <span className="day-value">{day}th</span>
              </div>
            </div>
            
            <div className="sip-summary">
              <p>Next execution: <strong>{day}/05/2026</strong></p>
              <p>Estimated shares: <strong>{Math.floor(amount/price) || 0}</strong></p>
            </div>
          </div>
        </div>

        <div className="window-footer">
          <button className="btn-setup" onClick={handleSetupSIP}>
            SETUP SIP
          </button>
          <button className="btn-secondary" onClick={closeSIPWindow}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockSIP;
