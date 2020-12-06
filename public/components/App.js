import React from "react";
import Header from "./Header";
import Products from "./Products";

function App(props) {
  return (
    <>
      <div className="shadow-sm p-2">
        <div className="col-sm-12">
          <h3>Cool ASCII faces</h3>
        </div>
      </div>
      <Header />
      <Products />
    </>
  );
}

export default App;
