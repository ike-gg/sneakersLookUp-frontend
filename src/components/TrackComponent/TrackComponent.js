import React from "react";
import { Link } from "react-router-dom";

import "./TrackComponent.css";
const TrackComponent = (props) => {
  const { trackingItems } = props;
  // const { trackingItems, setTrackingItems } = props;

  return (
    <section className="trackComponent">
      {trackingItems.map((item) => {
        return (
          <Link
            to={`/trackingItem/${item.id}`}
            key={item.id}
            className="trackComponent__itemCard"
          >
            <div className="itemCard__sizeTracking">{`US: ${item.size.sizeUS} – EU: ${item.size.sizeEU}`}</div>
            <img className="itemCard__image" src={item.image} alt="sneaker" />
            <h1 className="itemCard__title">{item.name}</h1>
            <h2 className="itemCard__colorway">CW: {item.colorway}</h2>
            <h3 className="itemCard__sku">{item.sku}</h3>
          </Link>
        );
      })}
    </section>
  );
};

export default TrackComponent;
