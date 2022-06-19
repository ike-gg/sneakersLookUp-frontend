import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./TrackingItem.css";

import PriceLabel from "./PriceLabel/PriceLabel";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import ActionButtons from "./ActionButtons/ActionButtons";
import NavBar from "./NavBar/NavBar";

import EssentialsContext from "../../context/EssentialsContext";

const TrackingItem = () => {
  const navigate = useNavigate();
  const {
    trackingItems,
    setTrackingItems,
    userPreferences,
    endpointApi,
  } = useContext(EssentialsContext);

  const { shoeSizeMetric } = userPreferences;

  const [liveData, setLiveData] = useState(false);
  const params = useParams();

  const currentItem = trackingItems.find(
    (item) => item.id === parseInt(params.trackingId, 10)
  );

  const { sku, name, retail, size } = currentItem;

  React.useEffect(() => {
    fetch(`${endpointApi}/api/getProduct/?q=${sku}`)
      .then((response) => response.json())
      .then((data) => {
        if (!(JSON.stringify(data) === "{}")) {
          setLiveData(data.sizes.find((sizes) => sizes.sizeUS === size.sizeUS));
        } else {
          setLiveData(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const closePopUp = (event) => {
    const { currentTarget, target } = event;
    if (currentTarget === target) {
      navigate("/", { replace: true });
    }
  };

  return (
    <section className="trackingItem__container" onClick={closePopUp}>
      <main className="trackingItem__box">
        <div className="trackingItem__content">
          <ProductPreview product={currentItem} labelType="size" />
          <section className="trackingItem__statsContainer">
            <NavBar name={name} closePopUp={closePopUp} />
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
            <ActionButtons item={currentItem} />
          </section>
        </div>
      </main>
    </section>
  );
};

export default TrackingItem;
