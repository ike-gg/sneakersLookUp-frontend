import React, { useContext } from "react";

import "./ProductLabel.css";

import EssentialsContext from "../../../context/EssentialsContext";

const PriceLabel = ({ product, labelType }) => {
  const { userPreferences, currencyRates } = useContext(EssentialsContext);

  let labelElement;

  if (labelType === "retail" && "retail" in product) {
    const { retail } = product;
    const { currency } = userPreferences;
    const retailPrice = (retail * currencyRates[currency]).toFixed(2);
    labelElement = (
      <div className="ProductPreview__iteminfo--priceLabel">
        <i className="uil uil-pricetag-alt" /> {retailPrice} {currency}
      </div>
    );
  } else if (labelType === "size" && "size" in product) {
    const { size } = product;
    const { shoeSizeMetric } = userPreferences;
    const itemSize = size[`size${shoeSizeMetric}`];
    labelElement = (
      <div className="ProductPreview__iteminfo--sizeLabel">
        <i className="uil uil-tag" /> {itemSize} {shoeSizeMetric}
      </div>
    );
  } else {
    return false;
  }

  return <div className="ProductLabel">{labelElement}</div>;
};

export default PriceLabel;
