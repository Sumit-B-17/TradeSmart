import React from "react";

function Hero() {
  return (
    <div className="w-full bg-z-light-gray">
      <div className="px-5 py-5 m-auto max-w-7xl md:py-10">
        <div className="support-portal container">
          <h1 className="pr-2 md:text-4xl text-xl sm:text-2xl font-semibold">
            <a
              href=""
              className="cursor-pointer"
              style={{ textDecoration: "none", color: "black" }}
            >
              Support Portal
            </a>
          </h1>
          <a>
            <button type="button" class="btn btn-primary">
              My tickets
            </button>
          </a>
        </div>
        <div className="support-search container">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col">
                <div class="search-container">
                  <input
                    type="text"
                    class="form-control search-input"
                    placeholder="Eg: How do I open my account, How do I activate my F&O..."
                  />
                  <i class="fa fa-search search-icon" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
