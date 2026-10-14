import React from "react";
import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../config";

function Navbar() {
  return (
      <nav class="navbar navbar-expand-lg bg-body-white border-bottom">
        <div class="container navbar-container">
          <Link class="navbar-brand" to="/">
            <img
              src="media/images/logo.svg"
              alt="Logo"
              class="img-fluid"
              style={{ width: "26%" }}
            />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex" role="search">
              <ul class="navbar-links navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href={DASHBOARD_URL}>Sign in</a>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/pricing">
                    Pricing
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/support">
                    Support
                  </Link>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
