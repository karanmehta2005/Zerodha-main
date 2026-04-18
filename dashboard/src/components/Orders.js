import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail") || "default";
    axios.get("/allOrders", { params: { user: userEmail } }).then((res) => {
      setAllOrders(res.data);
    });
  }, []);

  return (
    <div className="orders">
      {allOrders.length === 0 ? (
        <div className="no-orders" style={{ textAlign: "center", padding: "50px" }}>
          <p>You haven't placed any orders today</p>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{Number(order.price || 0).toFixed(2)}</td>
                  <td>
                    <span style={{
                      padding: "2px 8px",
                      borderRadius: "3px",
                      fontSize: "12px",
                      backgroundColor: order.mode === "BUY" ? "#e5f3ff" : "#fff1f0",
                      color: order.mode === "BUY" ? "#4184f3" : "#df5148",
                      fontWeight: "bold"
                    }}>
                      {order.mode}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
