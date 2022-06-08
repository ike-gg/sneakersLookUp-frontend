import React from "react";
import { Link } from "react-router-dom";

import "./TrackComponent.css";
const TrackComponent = (props) => {
  const { trackingItems } = props;

  return (
    <section
      className={
        trackingItems.length === 0 ? "trackComponent__empty" : "trackComponent"
      }
    >
      {trackingItems.length === 0 && (
        <div className="trackComponent__emptyList">
          <i className="uil uil-cube trackComponent__missingIcon"></i>
          <h1 className="trackComponent__missingTitle">
            Hey! It's look like you didn't add any items to tracking!
          </h1>
          <h2 className="trackComponent__missingDesc">
            You can add any sneakers you want by using the search menu.
          </h2>
        </div>
      )}
      {trackingItems.map((item) => {
        return (
          <Link
            to={`/trackingItem/${item.id}`}
            key={item.id}
            className="trackComponent__itemCard"
          >
            <div className="itemCard__sizeTracking">
              {`US: ${item.size.sizeUS} – EU: ${item.size.sizeEU}`}
            </div>
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
