import React from "react";

import "./SizeMetric.css";

const SizeMetric = (props) => {
  const { userPreferences, setUserPreferences } = props;

  const handleSizeSelect = (event) => {
    const newMetricSettings = event.target.id;
    setUserPreferences((prevSettings) => {
      return {
        ...prevSettings,
        shoeSizeMetric: newMetricSettings,
      };
    });
  };

  return (
    <li>
      <p>Shoe size metrics.</p>
      <div className="sizeMetric__radioContainer">
        <label
          className="likeButton smallButton infoButton settings__labelRadio"
          htmlFor="EU"
        >
          <input
            className="sizeMetric__radio"
            id="EU"
            type="radio"
            onChange={handleSizeSelect}
            checked={userPreferences.shoeSizeMetric === "EU" ? true : false}
          />
          EU
        </label>
        <label
          className="likeButton smallButton infoButton settings__labelRadio"
          htmlFor="US"
        >
          <input
            className="sizeMetric__radio"
            id="US"
            type="radio"
            onChange={handleSizeSelect}
            checked={userPreferences.shoeSizeMetric === "US" ? true : false}
          />
          US
        </label>
      </div>
    </li>
  );
};

export default SizeMetric;
