import React, { useState, useEffect, useContext } from "react";
import axios, { all } from "axios";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

// import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail") || "default";
    axios.get("/allHoldings", { params: { user: userEmail } }).then((res) => {
      // Initialize with slightly varied prices so P&L isn't always 0 initially
      const initialHoldings = res.data.map(stock => ({
        ...stock,
        price: stock.price * (1 + (Math.random() * 0.1 - 0.03)) // -3% to +7% initial variation
      }));
      setAllHoldings(initialHoldings);
    });
  }, []);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAllHoldings(prevHoldings => 
        prevHoldings.map(stock => ({
          ...stock,
          price: stock.price * (1 + (Math.random() * 0.004 - 0.002)) // -0.2% to +0.2% fluctuation
        }))
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [allHoldings.length]);

  const handleBuyClick = (stock) => {
    generalContext.openBuyWindow(stock.name, stock.price);
  };

  const handleSellClick = (stock) => {
    generalContext.openSellWindow(stock.name, stock.price);
  };

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>P&L %</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>
                    {((stock.price - stock.avg) / stock.avg * 100).toFixed(2)}%
                  </td>
                  <td>
                    <button
                      className="buy"
                      style={{
                        padding: "4px 8px",
                        marginRight: "5px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleBuyClick(stock)}
                    >
                      Buy
                    </button>
                    <button
                      className="sell"
                      style={{
                        padding: "4px 8px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSellClick(stock)}
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {allHoldings.reduce((acc, stock) => acc + stock.avg * stock.qty, 0).toFixed(2)}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {allHoldings.reduce((acc, stock) => acc + stock.price * stock.qty, 0).toFixed(2)}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>
            {(
              allHoldings.reduce((acc, stock) => acc + stock.price * stock.qty, 0) -
              allHoldings.reduce((acc, stock) => acc + stock.avg * stock.qty, 0)
            ).toFixed(2)}
            <span style={{ fontSize: "14px", marginLeft: "8px", fontWeight: "normal" }} className={(allHoldings.reduce((acc, stock) => acc + stock.price * stock.qty, 0) - allHoldings.reduce((acc, stock) => acc + stock.avg * stock.qty, 0)) >= 0 ? "profit" : "loss"}>
              ({( (allHoldings.reduce((acc, stock) => acc + stock.price * stock.qty, 0) - allHoldings.reduce((acc, stock) => acc + stock.avg * stock.qty, 0)) / (allHoldings.reduce((acc, stock) => acc + stock.avg * stock.qty, 0) || 1) * 100 ).toFixed(2)}%)
            </span>
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
