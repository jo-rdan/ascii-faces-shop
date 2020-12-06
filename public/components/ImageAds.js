import React from "react";

function ImageAds({ className }) {
  return (
    <div>
      <img
        src={`http://localhost:3000/ads?r=${setTimeout(() => {
          newNumber ? newNumber : 0;
        }, 2000)}`}
        className={className}
      />
    </div>
  );
}

export default ImageAds;
