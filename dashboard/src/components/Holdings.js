import React, { useState, useEffect } from "react";
import api from "../api";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    api.get("/allHoldings").then((res) => {
      setAllHoldings(Array.isArray(res.data) ? res.data : []);
    }).catch((error) => {
      console.error("Unable to load holdings:", error);
      setLoadError("Holdings could not be loaded. Please sign in again or try later.");
    });
  }, []);

  const chartLabels = allHoldings.map((stock) => stock.name);
  const investedValues = allHoldings.map((stock) => Number(stock.avg) * Number(stock.qty));
  const currentValues = allHoldings.map((stock) => Number(stock.price) * Number(stock.qty));
  const totalInvestment = investedValues.reduce((total, value) => total + value, 0);
  const totalCurrentValue = currentValues.reduce((total, value) => total + value, 0);
  const totalProfitLoss = totalCurrentValue - totalInvestment;
  const graphData = {
    labels: chartLabels,
    datasets: [
      { label: "Investment", data: investedValues, backgroundColor: "rgba(65, 132, 243, 0.72)" },
      { label: "Current value", data: currentValues, backgroundColor: "rgba(72, 194, 120, 0.72)" },
    ],
  };
  const formatCurrency = (value) => value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {loadError && <p className="holdings-error" role="alert">{loadError}</p>}

      <div className="order-table">
        <table>
          <thead><tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr></thead>

          <tbody>{allHoldings.map((stock, index) => {
            const curValue = Number(stock.price) * Number(stock.qty);
            const isProfit = curValue - Number(stock.avg) * Number(stock.qty) >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{Number(stock.avg).toFixed(2)}</td>
                <td>{Number(stock.price).toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - Number(stock.avg) * Number(stock.qty)).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            ); 
          })}</tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>₹{formatCurrency(totalInvestment)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>₹{formatCurrency(totalCurrentValue)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalProfitLoss >= 0 ? "holdings-profit" : "holdings-loss"}>₹{formatCurrency(totalProfitLoss)}</h5>
          <p>P&L</p>
        </div>
      </div>

      {allHoldings.length > 0 ? (
        <section className="holdings-charts" aria-label="Holdings chart">
          <div className="holdings-chart-card holdings-bar-card">
            <VerticalGraph data={graphData} />
          </div>
        </section>
      ) : !loadError ? (
        <p className="holdings-empty">Add holdings to see your portfolio charts.</p>
      ) : null}
    </>
  );
};

export default Holdings;
