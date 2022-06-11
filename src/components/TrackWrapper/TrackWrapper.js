import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./TrackWrapper.css";

import ProductPreview from "../ProductPreview/ProductPreview";

import EssentialsContext from "../../context/EssentialsContext";

const TrackComponent = () => {
  const { trackingItems, userPreferences } = useContext(EssentialsContext);
  const { shoeSizeMetric } = userPreferences;

  return (
    <section
      className={
        trackingItems.length === 0 ? "trackWrapper__empty" : "trackComponent"
      }
    >
      {trackingItems.length === 0 && (
        <div className="trackWrapper__emptyList">
          <i className="uil uil-cube trackWrapper__missingIcon"></i>
          <h2 className="trackWrapper__missingTitle">
            Hey! It's look like you didn't add any items to tracking!
          </h2>
          <h2 className="trackWrapper__missingDesc">
            You can add any sneakers you want by using the search menu.
          </h2>
        </div>
      )}
      {trackingItems.map((item) => {
        return (
          <Link
            to={`/trackingItem/${item.id}`}
            key={item.id}
            className="trackWrapper__itemCard"
          >
            <ProductPreview product={item} labelType="size" fontSize="small" />
          </Link>
        );
      })}
    </section>
  );
};

export default TrackComponent;
