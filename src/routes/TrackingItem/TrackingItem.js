import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./TrackingItem.css";

const TrackingItem = (props) => {
  console.log(props);
  const { trackingItems, setTrackingItems } = props;
  const params = useParams();
  const navigate = useNavigate();

  const currentItem = trackingItems.find(
    (item) => item.id === parseInt(params.trackingId, 10)
  );

  const { sku, name, image, retail, colorway, seller, size, url } = currentItem;

  const closePopUp = (event) => {
    const { currentTarget, target } = event;
    // check if thats right element to trigger a function
    if (currentTarget === target) {
      navigate("/", { replace: true });
    }
  };

  return (
    <section className="trackingItem__container" onClick={closePopUp}>
      <main className="trackingItem__box">
        <nav>
          <h1 className="trackingItem__title">{name}</h1>
          <i
            className="uil uil-multiply settings__closeButton"
            onClick={closePopUp}
          />
        </nav>
      </main>
    </section>
  );
};

export default TrackingItem;
