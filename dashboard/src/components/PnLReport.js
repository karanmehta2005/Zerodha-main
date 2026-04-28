import React, { useState, useEffect } from "react";
import axios from "axios";

const PnLReport = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail") || "default";
        const res = await axios.get(`/allOrders?user=${userEmail}`);
        // Filter only SELL orders which generate realized P&L
        const sellOrders = res.data.filter(order => order.mode === "SELL");
        setOrders(sellOrders);
      } catch (err) {
        console.error("Error fetching P&L data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const totalPnL = orders.reduce((acc, order) => acc + (order.pnl || 0), 0);
  const isTotalProfit = totalPnL >= 0;

  return (
    <div style={{ padding: "30px", background: "#f8f9fe", minHeight: "100vh" }}>
      <h2 style={{ color: "#444", marginBottom: "20px" }}>Profit & Loss Report (Realized)</h2>
      {loading ? (
        <p>Loading P&L data...</p>
      ) : orders.length === 0 ? (
        <p>No realized P&L data found. Sell some holdings to generate a report.</p>
      ) : (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eee", textAlign: "left", color: "#666" }}>
                <th style={{ padding: "12px 8px" }}>Instrument</th>
                <th style={{ padding: "12px 8px" }}>Qty Sold</th>
                <th style={{ padding: "12px 8px" }}>Sell Price</th>
                <th style={{ padding: "12px 8px", textAlign: "right" }}>Realized P&L</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const pnl = order.pnl || 0;
                const isProfit = pnl >= 0;
                return (
                  <tr key={index} style={{ borderBottom: "1px solid #f9f9f9" }}>
                    <td style={{ padding: "12px 8px", fontWeight: "600", color: "#4184f3" }}>{order.name}</td>
                    <td style={{ padding: "12px 8px" }}>{order.qty}</td>
                    <td style={{ padding: "12px 8px" }}>₹{order.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: "12px 8px", textAlign: "right", color: isProfit ? "#4caf50" : "#df5148", fontWeight: "600" }}>
                      {isProfit ? "+" : ""}₹{pnl.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "2px solid #eee", fontWeight: "bold" }}>
                <td colSpan="3" style={{ padding: "16px 8px", fontSize: "16px" }}>Total Realized P&L</td>
                <td style={{ padding: "16px 8px", textAlign: "right", fontSize: "18px", color: isTotalProfit ? "#4caf50" : "#df5148" }}>
                  {isTotalProfit ? "+" : ""}₹{totalPnL.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default PnLReport;
