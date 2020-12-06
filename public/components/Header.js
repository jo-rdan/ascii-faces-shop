import React from "react";
import ImageAds from "./ImageAds";

function Header(props) {
  return (
    <header>
      <div className="container">
        <div className="row m-3">
          <p>
            Here you're sure to find a bargain on some of the finest ascii
            available to purchase. Be sure to peruse our selection of ascii
            faces in an exciting range of sizes and prices.
          </p>

          <p>But first, a word from our sponsors:</p>
        </div>
        <ImageAds className="img-fluid" />
      </div>
    </header>
  );
}

export default Header;
