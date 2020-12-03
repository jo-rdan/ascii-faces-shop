import React, { useState, useEffect, useRef } from "react";
import "../styles/styles.css";
import Header from "./Header";
import ImageAds from "./ImageAds";

function App(props) {
  const [products, setProducts] = useState([]);
  const [productsSorted, setProductsSorted] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  // const [sortBy, setSortBy] = useState("");

  let page = 0;
  let sortName = "";
  const elementRef = useRef(null);

  const fetchProducts = async (sortName) => {
    sortName = sortName || null;
    if (sortName) {
      console.log("2");
      // setSortBy(e.target.textContent.toLowerCase());
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/products?_page=${(page += 1)}&_limit=20&_sort=${sortName}`
      );
      const productsData = await response.json();
      setProductsSorted((productsSorted) => [
        ...productsSorted,
        ...productsData,
      ]);
      setIsLoading(false);
      window.addEventListener("scroll", handleScrollSort);
      return () => window.removeEventListener("scroll", handleScrollSort);
    }
    console.log("3");
    const response = await fetch(
      `http://localhost:3000/products?_page=${(page += 1)}&_limit=20`
    );
    const productsData = await response.json();
    setProducts((products) => [...products, ...productsData]);
    console.log("seriously");
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  };

  useEffect(() => {
    console.log("1");
    // if (sortName === "size") {
    //   fetchProducts(sortName);
    // }
    fetchProducts();
  }, [sortName]);

  const handleScrollSort = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    console.log("Fetch more products sorted!");
    setIsFetching(true);
    fetchProducts(sortName);
  };

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

  const handleDate = (currentDate, productDate) => {
    console.log("====================================");
    console.log(currentDate, productDate);
    console.log("====================================");
    // const minutes = 60 * 1000;
    // const hours = minutes * 60;
    // const days = hours * 24;
    // const weeks = days * 7;

    // const timePassed = currentDate - productDate;

    // if (timePassed < minutes)
    //   return `${Math.floor(timePassed / 1000)} seconds ago`;
    // if (timePassed < hours)
    //   return `${Math.floor(timePassed / minutes)} minutes ago`;
    // if (timePassed < days) return `${Math.floor(timePassed / hours)} hours ago`;
    // if (timePassed < weeks) return `${Math.floor(timePassed / days)} days ago`;
    // return productDate;
  };

  return (
    <div className="container">
      <Header />
      <ImageAds />

      <div className="row justify-content-center m-3">
        <div className="col">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-success dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort products by {sortName}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div
                className="dropdown-item"
                onClick={(e) => {
                  sortName = e.target.textContent.toLowerCase();
                  fetchProducts(sortName);
                }}
              >
                Size
              </div>
              <div
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  sortName = e.target.textContent.toLowerCase();
                  fetchProducts(sortName);
                }}
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
        {productsSorted.length === 0
          ? products &&
            products.map((product, index) => {
              return (
                <div className="col-sm-4 m-3 p-2 shadow-lg">
                  <div className="row m-6">
                    <div className="col-sm-11 h-auto">
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
                          <small className="text-muted">Price:</small> $
                          {(product.price / 100).toFixed(2)}
                        </p>
                      </div>
                      <div
                        onLoad={() =>
                          handleDate(
                            Date.now().toDateString(),
                            `${new Date(product.date).getDate()}-${new Date(
                              product.date
                            ).getMonth()}-${new Date(
                              product.date
                            ).getFullYear()}`
                          )
                        }
                      >
                        <p>{`${new Date(product.date).getDate()}-${new Date(
                          product.date
                        ).getMonth()}-${new Date(
                          product.date
                        ).getFullYear()}`}</p>
                        {/* <p>
                        {() =>
                          handleDate(
                            Date.now().toDateString(),
                            `${new Date(product.date).getDate()}-${new Date(
                              product.date
                            ).getMonth()}-${new Date(
                              product.date
                            ).getFullYear()}`
                          )
                        }
                      </p> */}
                      </div>
                      <div>{product.size}</div>
                      <div className="btn btn-primary">
                        Pay ${(product.price / 100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : productsSorted &&
            productsSorted.map((product) => {
              return (
                <div className="col-sm-4 m-3 p-2 shadow-lg">
                  <div className="row m-6">
                    <div className="col-sm-11 h-auto">
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
                          <small className="text-muted">Price:</small> $
                          {(product.price / 100).toFixed(2)}
                        </p>
                      </div>
                      <div
                        onLoad={() =>
                          handleDate(
                            Date.now().toDateString(),
                            `${new Date(product.date).getDate()}-${new Date(
                              product.date
                            ).getMonth()}-${new Date(
                              product.date
                            ).getFullYear()}`
                          )
                        }
                      >
                        <p>{`${new Date(product.date).getDate()}-${new Date(
                          product.date
                        ).getMonth()}-${new Date(
                          product.date
                        ).getFullYear()}`}</p>
                        {/* <p>
                        {() =>
                          handleDate(
                            Date.now().toDateString(),
                            `${new Date(product.date).getDate()}-${new Date(
                              product.date
                            ).getMonth()}-${new Date(
                              product.date
                            ).getFullYear()}`
                          )
                        }
                      </p> */}
                      </div>
                      <div>{product.size}</div>
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
        // style={{ display: isFetching && products.length < 500 ? "" : "none" }}
      >
        {products.length < 500 ? (
          <div className="col-sm-2">
            Loading...{" "}
            <span className="spinner-border spinner-border-sm text-primary"></span>
          </div>
        ) : (
          <div className="col-sm-2">
            <p className="text-muted">~ End of catalogue ~</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
