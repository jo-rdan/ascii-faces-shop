import React, { useState, useEffect } from "react";
import "../styles/styles.css";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [productsSorted, setProductsSorted] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [end, setEnd] = useState(false);

  let page = 0;
  let sortName = "";

  const fetchProducts = async () => {
    sortName = sortName || null;
    if (sortName) {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/products?_page=${(page += 1)}&_limit=20&_sort=${sortName}`
      );
      const productsData = await response.json();

      if (productsData.length === 0) return setEnd(true);
      setProductsSorted((productsSorted) => [
        ...productsSorted,
        ...productsData,
      ]);
      setIsLoading(false);
      window.addEventListener("scroll", handleScrollSort);
      return;
    }
    const response = await fetch(
      `http://localhost:3000/products?_page=${(page += 1)}&_limit=20`
    );
    const productsData = await response.json();
    if (productsData.length === 0) return setEnd(true);
    setProducts((products) => [...products, ...productsData]);
    window.addEventListener("scroll", handleScroll);
  };

  useEffect(() => {
    fetchProducts();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollSort = async (sortName) => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

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
    setIsFetching(true);
    fetchProducts();
  };

  const handleSort = ({ target }) => {
    sortName = target.textContent.toLowerCase();
    setSortBy(target.textContent.toLowerCase());
    fetchProducts(sortName);
  };

  const handleDate = (current, previous) => {
    const minutesUnit = 60 * 1000;
    const hoursUnit = minutesUnit * 60;
    const daysUnit = hoursUnit * 24;
    const weeksUnit = daysUnit * 7;

    var elapsed = current - previous;

    if (elapsed < minutesUnit)
      return `${Math.round(elapsed / 1000)} seconds ago`;
    if (elapsed < hoursUnit)
      return `${Math.round(elapsed / minutesUnit)}minutes ago`;
    if (elapsed < daysUnit)
      return `${Math.round(elapsed / hoursUnit)} hours ago`;
    if (elapsed < weeksUnit)
      return `${Math.round(elapsed / daysUnit)} days ago`;

    return null;
  };

  return (
    <div className="container">
      <div className="row justify-content-center m-2">
        <div className="col-sm-11">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-white dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort products by {sortBy}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div className="dropdown-item" onClick={(e) => handleSort(e)}>
                Size
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="row justify-content-center">
          <div className="col-sm-2">
            Sorting by {sortBy}...{" "}
            <span className="spinner-border spinner-border-sm text-primary"></span>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="row justify-content-center ">
        {productsSorted.length === 0
          ? products &&
            products.map((product, index) => {
              const elapsed = handleDate(new Date(), +new Date(product.date));
              return (
                <div
                  className="col-md-5 col-sm-auto col-xs-auto m-3 p-2 shadow-sm rounded bg-light"
                  key={product.id}
                >
                  <div className="col-sm-12 h-auto">
                    <div className="row mb-5 justify-content-center align-items-center">
                      <div className="col-xs-auto col-xs-12">
                        <div className="col-sm-auto col-xs-12 p-3 shadow-sm rounded-circle bg-warning">
                          <p
                            style={{
                              fontSize: `${product.size}px`,
                            }}
                            className="text-center col-xs-2"
                          >
                            {product.face}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row justify-content-center border-">
                      <div className="col-sm-10">
                        <div>
                          <p className="text-center">
                            <small className="text-muted">Size: </small>
                            {product.size} pixels
                          </p>
                        </div>
                        <div>
                          <p className="text-center">
                            <small className="text-muted">Price:</small> $
                            {(product.price / 100).toFixed(2)}
                          </p>
                        </div>

                        <div className="float-right">
                          <p className="text-date">
                            <small className="text-muted">Posted: </small>
                            {elapsed
                              ? elapsed
                              : `${new Date(product.date).getDate()}-${new Date(
                                  product.date
                                ).getMonth()}-${new Date(
                                  product.date
                                ).getFullYear()}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="btn btn-primary col-sm-9 ">
                        Pay ${(product.price / 100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : productsSorted &&
            productsSorted.map((product) => {
              const elapsed = handleDate(new Date(), +new Date(product.date));
              return (
                <div
                  className="col-md-5 col-sm-12 m-3 p-2 shadow-sm bg-light"
                  key={product.id}
                >
                  <div className="col-sm-12 h-auto">
                    <div className="row mb-5 justify-content-center align-items-center">
                      <div className="col-xs-auto col-xs-12">
                        <div className="col-sm-auto col-xs-12 p-3 shadow-sm rounded-circle bg-warning">
                          <p
                            style={{
                              fontSize: `${product.size}px`,
                            }}
                            className="text-center col-xs-2"
                          >
                            {product.face}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row justify-content-center border-">
                      <div className="col-sm-10">
                        <div>
                          <p className="text-center">
                            <small className="text-muted">Size: </small>
                            {product.size} pixels
                          </p>
                        </div>
                        <div>
                          <p className="text-center">
                            <small className="text-muted">Price:</small> $
                            {(product.price / 100).toFixed(2)}
                          </p>
                        </div>

                        <div className="float-right">
                          <p className="text-date">
                            <small className="text-muted">Posted: </small>
                            {elapsed
                              ? elapsed
                              : `${new Date(product.date).getDate()}-${new Date(
                                  product.date
                                ).getMonth()}-${new Date(
                                  product.date
                                ).getFullYear()}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="btn btn-primary col-sm-9 ">
                        Pay ${(product.price / 100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <div className="row justify-content-center">
        {!end ? (
          <div className="col-sm-auto">
            Loading more...{" "}
            <span className="spinner-border spinner-border-sm text-primary"></span>
          </div>
        ) : (
          <div className="col-sm-auto">
            <p className="text-muted">~ End of catalogue ~</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
