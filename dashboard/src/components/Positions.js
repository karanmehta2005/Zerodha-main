import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail") || "default";
    axios.get("/allPositions", { params: { user: userEmail } }).then((res) => {
      const initialPositions = res.data.map(stock => ({
        ...stock,
        price: stock.price * (1 + (Math.random() * 0.1 - 0.03))
      }));
      setAllPositions(initialPositions);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAllPositions(prevPositions => 
        prevPositions.map(stock => ({
          ...stock,
          price: stock.price * (1 + (Math.random() * 0.004 - 0.002))
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [allPositions.length]);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>P&L %</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{(stock.avg || 0).toFixed(2)}</td>
                  <td>{(stock.price || 0).toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>
                    {((stock.price - stock.avg) / (stock.avg || 1) * 100).toFixed(2)}%
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
