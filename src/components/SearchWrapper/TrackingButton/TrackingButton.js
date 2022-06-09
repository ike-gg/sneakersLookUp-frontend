import React from "react";

import "./TrackingButton.css";

const TrackingButton = ({ addItemToTracking, selectedSize }) => {
  return (
    <div className="trackingItem__button">
      <button
        className={selectedSize ? "" : "disabledButton smallButton"}
        onClick={addItemToTracking}
      >
        <i className="uil uil-plus" /> Add it as tracking
      </button>
      {!selectedSize && (
        <div className="trackingItem__trackingWarning smallButton">
          Select size before adding it for tracking
        </div>
      )}
    </div>
  );
};

export default TrackingButton;
