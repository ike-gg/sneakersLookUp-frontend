import React from "react";

import "./SearchResult.css";

import ProductPreview from "../../ProductPreview/ProductPreview";
import SizeTable from "./SizeTable/SizeTable";

const SearchResult = (props) => {
  const { selectedSize, setSelectedSize, item } = props;

  return (
    <section className="SearchResult__element">
      <div className="SearchResult__box">
        <ProductPreview
          product={item}
          labelType="retail"
          fontSize={"0.95rem"}
          sticky
        />
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
