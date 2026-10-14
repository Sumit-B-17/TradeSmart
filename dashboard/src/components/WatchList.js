import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { watchlist } from "../data/data";
import GeneralContext from "./GeneralContext";
import api from "../api";
import { DoughnutChart } from "./DoghnoutChart";

const WatchList = () => {
  const { pathname } = useLocation();
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    if (pathname !== "/holdings") return;
    api.get("/allHoldings")
      .then(({ data }) => setHoldings(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Unable to load holdings allocation:", error));
  }, [pathname]);

  const allocationData = {
    labels: holdings.map((stock) => stock.name),
    datasets: [{
      label: "Current value",
      data: holdings.map((stock) => Number(stock.price) * Number(stock.qty)),
      backgroundColor: ["#4184f3", "#48c278", "#ff8a65", "#9575cd", "#26a69a", "#fbc02d", "#ec407a", "#78909c", "#7e57c2", "#66bb6a"],
      borderWidth: 1,
    }],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

      {pathname === "/holdings" && (
        <section className="allocation-panel" aria-label="Portfolio allocation">
          <h3>Portfolio allocation</h3>
          {holdings.length ? (
            <div className="allocation-chart">
              <DoughnutChart data={allocationData} />
            </div>
          ) : (
            <p className="allocation-empty">No holdings to display.</p>
          )}
        </section>
      )}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <span className="down">↓</span>
          ) : (
            <span className="up">↑</span>
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  const handleSellClick = () => {
    generalContext.openSellWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        <button className="buy" title="Buy (B)" onClick={handleBuyClick}>Buy</button>
        <button className="sell" title="Sell (S)" onClick={handleSellClick}>Sell</button>
        <button className="action" title="Analytics (A)">
          <span className="icon">▥</span>
        </button>
        <button className="action" title="More">
          <span className="icon">•••</span>
        </button>
      </span>
    </span>
  );
};
