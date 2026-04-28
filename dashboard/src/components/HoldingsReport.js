import React, { useState, useEffect } from "react";
import axios from "axios";

const HoldingsReport = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail") || "default";
        const res = await axios.get(`/allHoldings?user=${userEmail}`);
        setHoldings(res.data);
      } catch (err) {
        console.error("Error fetching holdings data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHoldings();
  }, []);

  const totalInvestment = holdings.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
  const totalCurrentValue = holdings.reduce((acc, stock) => acc + (stock.price * stock.qty), 0);
  const unrealizedPnL = totalCurrentValue - totalInvestment;
  const isProfit = unrealizedPnL >= 0;

  return (
    <div style={{ padding: "30px", background: "#f8f9fe", minHeight: "100vh" }}>
      <h2 style={{ color: "#444", marginBottom: "20px" }}>Holdings Report</h2>
      
      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <p style={{ margin: 0, color: "#888", fontSize: "14px" }}>Total Investment</p>
          <h3 style={{ margin: "5px 0 0 0", color: "#333" }}>₹{totalInvestment.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
        </div>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <p style={{ margin: 0, color: "#888", fontSize: "14px" }}>Current Value</p>
          <h3 style={{ margin: "5px 0 0 0", color: "#333" }}>₹{totalCurrentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
        </div>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", flex: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <p style={{ margin: 0, color: "#888", fontSize: "14px" }}>Unrealized P&L</p>
          <h3 style={{ margin: "5px 0 0 0", color: isProfit ? "#4caf50" : "#df5148" }}>
            {isProfit ? "+" : ""}₹{unrealizedPnL.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h3>
        </div>
      </div>

      {loading ? (
        <p>Loading holdings data...</p>
      ) : holdings.length === 0 ? (
        <p>You currently have no holdings.</p>
      ) : (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eee", textAlign: "left", color: "#666" }}>
                <th style={{ padding: "12px 8px" }}>Instrument</th>
                <th style={{ padding: "12px 8px" }}>Qty</th>
                <th style={{ padding: "12px 8px" }}>Avg. Cost</th>
                <th style={{ padding: "12px 8px" }}>LTP</th>
                <th style={{ padding: "12px 8px" }}>Cur. Val</th>
                <th style={{ padding: "12px 8px", textAlign: "right" }}>Unrealized P&L</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((stock, index) => {
                const curVal = stock.price * stock.qty;
                const invVal = stock.avg * stock.qty;
                const pnl = curVal - invVal;
                const isStockProfit = pnl >= 0;
                return (
                  <tr key={index} style={{ borderBottom: "1px solid #f9f9f9" }}>
                    <td style={{ padding: "12px 8px", fontWeight: "600", color: "#4184f3" }}>{stock.name}</td>
                    <td style={{ padding: "12px 8px" }}>{stock.qty}</td>
                    <td style={{ padding: "12px 8px" }}>₹{stock.avg.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: "12px 8px" }}>₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: "12px 8px" }}>₹{curVal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: "12px 8px", textAlign: "right", color: isStockProfit ? "#4caf50" : "#df5148", fontWeight: "600" }}>
                      {isStockProfit ? "+" : ""}₹{pnl.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HoldingsReport;
