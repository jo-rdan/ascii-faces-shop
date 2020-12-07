import React from "react";

function ImageAds({ className }) {
  return (
    <div>
      <img
        src={`http://localhost:3000/ads?r=${Math.random(1, 1000)}`}
        className={className}
      />
    </div>
  );
}

export default ImageAds;
