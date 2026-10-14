import React, { useContext, useState } from "react";
import api from "../api";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState("");
  const { closeSellWindow } = useContext(GeneralContext);

  const handleSellClick = async () => {
    const quantity = Number(stockQuantity);
    const price = Number(stockPrice);

    if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(price) || price <= 0) {
      setError("Enter a quantity and price greater than zero.");
      return;
    }

    try {
      setError("");
      await api.post("/newOrder", {
        name: uid,
        qty: quantity,
        price,
        mode: "SELL",
      });
      closeSellWindow();
    } catch (requestError) {
      console.error("Unable to place sell order:", requestError);
      setError("Order could not be placed. Ensure the backend is running on port 3002.");
    }
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="header sell-window-header">
        <h3>Sell {uid}</h3>
        <span>Regular order</span>
      </div>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              min="1"
              step="1"
              onChange={(event) => setStockQuantity(event.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              min="0.01"
              step="0.05"
              onChange={(event) => setStockPrice(event.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>
      <div className="buttons">
        <span>Sell order value ₹{(Number(stockQuantity) * Number(stockPrice) || 0).toFixed(2)}</span>
        <div>
          <button type="button" className="btn btn-sell" onClick={handleSellClick}>
            Sell
          </button>
          <button type="button" className="btn btn-grey" onClick={closeSellWindow}>
            Cancel
          </button>
        </div>
      </div>
      {error && <p className="order-error" role="alert">{error}</p>}
    </div>
  );
};

export default SellActionWindow;
