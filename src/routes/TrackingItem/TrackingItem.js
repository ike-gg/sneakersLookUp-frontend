import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PriceLabel from "./PriceLabel/PriceLabel";

import "./TrackingItem.css";

const TrackingItem = (props) => {
  const { trackingItems, setTrackingItems } = props;
  const { shoeSizeMetric } = props.userPreferences;

  const { endpointApi } = props;

  const [liveData, setLiveData] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const currentItem = trackingItems.find(
    (item) => item.id === parseInt(params.trackingId, 10)
  );

  const {
    id,
    sku,
    name,
    image,
    retail,
    colorway,
    seller,
    size,
    url,
  } = currentItem;

  const closePopUp = (event) => {
    const { currentTarget, target } = event;
    // check if thats right element to trigger a function
    if (currentTarget === target) {
      navigate("/", { replace: true });
    }
  };

  React.useEffect(() => {
    fetch(`${endpointApi}/api/getProduct/?q=${sku}`)
      .then((response) => response.json())
      .then((data) => {
        if (!(JSON.stringify(data) === "{}")) {
          setLiveData(data.sizes.find((sizes) => sizes.sizeUS === size.sizeUS));
        } else {
          setLiveData(null);
        }
      });
  }, []);

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete ${name} item?`)) {
      setTrackingItems((prevState) => {
        const indexOfItem = prevState.findIndex((items) => items.id === id);
        prevState.splice(indexOfItem, 1);
        return [...prevState];
      });
      navigate("/", { replace: true });
    }
  };

  return (
    <section className="trackingItem__container" onClick={closePopUp}>
      <main className="trackingItem__box">
        <div className="trackingItem__content">
          <section className="trackingItem__productDetails">
            <img src={image} className="productDetails__image" alt="sneaker" />
            <h2 className="itemCard__title">{name}</h2>
            <h3 className="SearchResult__desc">
              <div className="SearchResult__desc--seller">By {seller}</div> CW:{" "}
              {colorway}
            </h3>
            <h3 className="itemCard__sku">{sku}</h3>
          </section>
          <section className="trackingItem__statsContainer">
            <nav className="trackingItem__nav">
              <h1 className="trackingItem__title">{name}</h1>
              <i
                className="uil uil-multiply trackingItem__closeButton"
                onClick={closePopUp}
              />
            </nav>
            {!liveData && (
              <section className="trackingItem__fetching">
                <i className="uil uil-sync spinning"></i>
                <p>Fetching data..</p>
              </section>
            )}
            {liveData && (
              <>
                <section className="trackingItem__stats">
                  <h2 className="trackingItem__size">
                    <i className="uil uil-file-blank" /> Tracking size:{" "}
                    <div className="label">
                      {`${size[`size${shoeSizeMetric}`]} ${shoeSizeMetric}`}
                    </div>
                    <i className="uil uil-pricetag-alt" /> Retail:{" "}
                    <div className="label">{retail} €</div>
                  </h2>
                  <h3 className="trackingItem__prices">Prices:</h3>
                  <PriceLabel bid products={[size, liveData]} />
                  <PriceLabel ask products={[size, liveData]} />
                </section>
              </>
            )}
            <div className="trackingItems__buttons">
              <button
                onClick={handleRemove}
                className="smallButton dangerButton trackingItems__removeButton"
              >
                Remove item <i className="uil uil-trash-alt"></i>
              </button>
              <a
                className="smallButton likeButton"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link to StockX <i className="uil uil-external-link-alt"></i>
              </a>
            </div>
          </section>
        </div>
      </main>
    </section>
  );
};

export default TrackingItem;
