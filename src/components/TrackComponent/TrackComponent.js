import React from "react";
import { Link } from "react-router-dom";

import "./TrackComponent.css";

import ItemCard from "./ItemCard/ItemCard.js";

const TrackComponent = (props) => {
  const { trackingItems } = props;
  console.log(props);
  // const { trackingItems, setTrackingItems } = props;

  return (
    <section className="trackComponent">
      {trackingItems.map((item, index) => {
        return (
          <article key={index} className="trackComponent__itemCard">
            <div className="itemCard__sizeTracking">{`US: ${item.size.sizeUS} – EU: ${item.size.sizeEU}`}</div>
            <img className="itemCard__image" src={item.image} alt="sneaker" />
            <h1 className="itemCard__title">{item.name}</h1>
            <h2 className="itemCard__colorway">CW: {item.colorway}</h2>
            <h3 className="itemCard__sku">{item.sku}</h3>
          </article>
        );
      })}
    </section>
  );
};

export default TrackComponent;
