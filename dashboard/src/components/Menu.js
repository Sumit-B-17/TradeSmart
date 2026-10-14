import React, {useState} from "react";
import {Link} from "react-router-dom";

const marketingUrl = (process.env.REACT_APP_MARKETING_URL || "http://localhost:3000").replace(/\/$/, "");

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState("false");

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (index) => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const currentUser = (() => {
    try { return JSON.parse(localStorage.getItem("tradesmart_user") || "null"); } catch (_) { return null; }
  })();

  const handleLogout = () => {
    localStorage.removeItem("tradesmart_token");
    localStorage.removeItem("tradesmart_user");
    window.location.reload();
  };

  return (
    <div className="menu-container">
      <img src="/logo.png" alt="TradeSmart logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link style={{textDecoration: "none"}} to="/" onClick={() => handleMenuClick(0)}>
              <p className={`menu ${selectedMenu === 0 ? "selected" : ""}`}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration: "none"}} to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={`menu ${selectedMenu === 1 ? "selected" : ""}`}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration: "none"}} to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={`menu ${selectedMenu === 2 ? "selected" : ""}`}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration: "none"}} to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={`menu ${selectedMenu === 3 ? "selected" : ""}`}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration: "none"}} to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={`menu ${selectedMenu === 4 ? "selected" : ""}`}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration: "none"}} to="/apps" onClick={() => handleMenuClick(5)}>
              <p className={`menu ${selectedMenu === 5 ? "selected" : ""}`}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <a className="menu" href={marketingUrl}>TradeSmart website</a>
        <div className="profile">
          <div className="avatar">{(currentUser?.username || "U").slice(0, 2).toUpperCase()}</div>
          <p className="username">{currentUser?.username || "User"}</p>
          <button type="button" className="logout-button" onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
