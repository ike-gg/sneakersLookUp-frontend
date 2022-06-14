import React, { useContext } from "react";

import "./SearchResult.css";

import ProductPreview from "../../ProductPreview/ProductPreview";
import SizeTable from "./SizeTable/SizeTable";

import EssentialsContext from "../../../context/EssentialsContext";

const SearchResult = (props) => {
  const { selectedSize, setSelectedSize, item } = props;
  const { currencyRates, userPreferences } = useContext(EssentialsContext);
  const { shoeSizeMetric, currency } = userPreferences;

  const handleSelectSize = (event) => {
    setSelectedSize(event.currentTarget.dataset.size);
  };

  return (
    <section className="SearchResult__element">
      <div className="SearchResult__box">
        <div className="SearchResult__productStickyContainer">
          <ProductPreview product={item} labelType="retail" sticky />
        </div>
        <SizeTable
          sizes={item.sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </div>
    </section>
  );
};

export default SearchResult;
