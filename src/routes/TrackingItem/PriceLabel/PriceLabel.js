import React from "react";

import "./PriceLabel.css";

const PriceLabel = (props) => {
  const { bid, ask } = props;
  const [addOnStatus, liveStatus] = props.products;

  let typePrice, addOnPrice, livePrice;
  let classLabelColor, icon;

  if (bid) {
    typePrice = "Highest BID";
    addOnPrice = addOnStatus.highestBid;
    livePrice = liveStatus.highestBid;
    if (livePrice > addOnPrice) {
      classLabelColor = "priceLabel__red";
      icon = "up";
    } else if (livePrice < addOnPrice) {
      classLabelColor = "priceLabel__green";
      icon = "down";
    }
  }

  if (ask) {
    typePrice = "Lowest ASK";
    addOnPrice = addOnStatus.lowestAsk;
    livePrice = liveStatus.lowestAsk;
    if (livePrice > addOnPrice) {
      classLabelColor = "priceLabel__green";
      icon = "up";
    } else if (livePrice < addOnPrice) {
      classLabelColor = "priceLabel__red";
      icon = "down";
    }
  }

  return (
    <div className="priceLabel">
      <div className="priceLabel__typePrice">
        <i className="uil uil-label" />
        {typePrice}
      </div>
      <div className="priceLabel__addOn">
        <i className="uil uil-bookmark" />
        Add-on price: {addOnPrice} €
      </div>
      <div className={`${classLabelColor} priceLabel__live`}>
        {icon === "up" && <i className="uil uil-arrow-growth" />}
        {icon === "down" && <i className="uil uil-chart-down" />}
        Live price: {livePrice} €
      </div>
    </div>
  );
};

export default PriceLabel;
