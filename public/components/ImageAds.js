import React from "react";

function ImageAds(props) {
  return (
    <div>
      <img
        src={`http://localhost:3000/ads?r=${Math.floor(Math.random() * 1000)}`}
      />
    </div>
  );
}

export default ImageAds;
