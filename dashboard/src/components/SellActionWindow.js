import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

import { stockNames } from "../data/stockNames";
import BarChartOutlined from "@mui/icons-material/BarChartOutlined";
import BoltIcon from "@mui/icons-material/Bolt";

const SellActionWindow = ({ uid, price }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(price || 0.0);
  const generalContext = useContext(GeneralContext);

  const fullName = stockNames[uid] || uid;

  // Mock stats
  const openPrice = (price * 0.98).toFixed(2);
  const highPrice = (price * 1.02).toFixed(2);
  const lowPrice = (price * 0.97).toFixed(2);
  const prevClose = (price * 1.01).toFixed(2);

  const handleSellClick = async () => {
    try {
      await axios.post("/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
        user: localStorage.getItem("userEmail") || "default",
      });
      generalContext.closeSellWindow();
    } catch (err) {
      console.error("Sell order error:", err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.response?.data || "Error processing sell order";
      alert(typeof errorMessage === "string" ? errorMessage : "Error processing sell order");
    }
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="order-window sell-theme" id="sell-window">
      <div className="window-header">
        <div className="stock-titles">
          <h3>{uid}</h3>
          <p>{fullName} • NSE</p>
        </div>
        <div className="price-details text-right">
          <h3 className="current-price" style={{ color: "#df5148" }}>₹{price?.toFixed(2)}</h3>
          <p className="price-change">-0.35 (-0.07%)</p>
        </div>
      </div>

      <div className="market-depth-grid">
        <div className="stat-col"><span>Open</span><p>{openPrice}</p></div>
        <div className="stat-col"><span>High</span><p>{highPrice}</p></div>
        <div className="stat-col"><span>Low</span><p>{lowPrice}</p></div>
        <div className="stat-col"><span>Prev. Close</span><p>{prevClose}</p></div>
      </div>

      <div className="depth-table-container">
        <table className="depth-table">
          <thead>
            <tr>
              <th>Qty.</th>
              <th>Buy Price</th>
              <th>Sell Price</th>
              <th>Qty.</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <tr key={i}>
                <td>{Math.floor(Math.random() * 1000)}</td>
                <td className="buy-text">{(price * (1 - i * 0.001)).toFixed(2)}</td>
                <td className="sell-text">{(price * (1 + i * 0.001)).toFixed(2)}</td>
                <td>{Math.floor(Math.random() * 1000)}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td>999</td>
              <td colSpan="2">Total Quantity</td>
              <td>999</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="order-form">
        <div className="input-group">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="utility-actions">
        <button className="btn-utility" onClick={() => generalContext.openChartWindow(uid, price)}><BarChartOutlined fontSize="small" /> Charts</button>
        <button className="btn-utility" onClick={() => generalContext.openSIPWindow(uid, price)}><BoltIcon fontSize="small" /> Stock SIP</button>
      </div>

      <div className="window-footer">
        <div className="margin-container">
          <p className="label">Margin required</p>
          <p className="value">₹{(stockQuantity * stockPrice).toFixed(2)}</p>
        </div>
        <div className="main-actions">
          <button className="btn-sell" onClick={handleSellClick}>SELL</button>
          <button className="btn-cancel" onClick={handleCancelClick}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
