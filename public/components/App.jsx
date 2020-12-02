import React, { useState, useEffect, useRef } from "react";
import "../styles/styles.css";
import Header from "./Header";
import ImageAds from "./ImageAds";

function App(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [sortBy, setSortBy] = useState("");

  let page = 0;
  const elementRef = useRef(null);

  const fetchProducts = async (e) => {
    e = e || null;
    if (e) {
      setSortBy(e.target.textContent.toLowerCase());
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/products?_page=${(page += 1)}&_limit=20&_sort=${e.target.textContent.toLowerCase()}`
      );
      const productsData = await response.json();
      setProducts(productsData);
      setIsLoading(false);
    }

    const response = await fetch(
      `http://localhost:3000/products?_page=${(page += 1)}&_limit=20`
    );
    const productsData = await response.json();
    setProducts((products) => [...products, ...productsData]);
  };

  useEffect(() => {
    fetchProducts();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    console.log("Fetch more products!");
    setIsFetching(true);
    fetchProducts();
  };

  console.log("====================================");
  console.log(products.length);
  console.log("====================================");
  return (
    <div className="container">
      <Header />
      <ImageAds />

      <div className="row justify-content-center m-3">
        <div className="col">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort products by {sortBy}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div className="dropdown-item" onClick={(e) => fetchProducts(e)}>
                Size
              </div>
              <div
                className="dropdown-item"
                href="#"
                onClick={(e) => fetchProducts(e)}
              >
                Price
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item" href="#">
                ID
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ display: isLoading ? "flex" : "none" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div ref={elementRef} className="row justify-content-center">
        {products &&
          products.map((product, index) => {
            return (
              <div className="col-sm-auto m-3 p-2 shadow-lg">
                <div className="row m-6">
                  <div className="col-sm-11 w-auto h-auto">
                    <div className="row m-2 justify-content-center">
                      <div className="col-sm-auto">
                        <div style={{ fontSize: `${product.size}px` }}>
                          <p>{product.face}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p>
                        {" "}
                        <small class="text-muted">Price:</small> $
                        {(product.price / 100).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p>{product.date}</p>
                    </div>
                    <div className="btn btn-primary">
                      Pay ${(product.price / 100).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div
        className="row justify-content-center"
        style={{ display: isFetching && products.length < 500 ? "" : "none" }}
      >
        <div className="col-sm-3">
          Loading... <span className="spinner-border text-primary"></span>
        </div>
      </div>
    </div>
  );
}

export default App;
