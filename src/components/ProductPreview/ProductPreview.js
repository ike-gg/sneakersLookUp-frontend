import React, { useContext } from "react";

import "./ProductPreview.css";

import ProductLabel from "./ProductLabel/ProductLabel";

const ProductPreview = ({ product, labelType, fontSize, sticky }) => {
  const { retail, image, name, seller, colorway, sku } = product;

  let classForContainer;

  if (sticky) {
    classForContainer = "SearchResult__productStickyContainer";
  } else {
    classForContainer = "ProductPreview__relativeContainer";
  }

  return (
    <div>
      <main className={classForContainer} style={{ fontSize }}>
        <ProductLabel product={product} labelType={labelType} />
        <img
          className="ProductPreview__image"
          alt="sneakers preview"
          src={image}
        />
        <h2 className="ProductPreview__title">{name}</h2>
        <h3 className="ProductPreview__desc">
          <span className="ProductPreview__desc--seller">By {seller}</span>{" "}
          <span className="ProductPreview__desc--colorway">CW: {colorway}</span>
        </h3>
        <h6 className="ProductPreview__sku">SKU: {sku}</h6>
      </main>
    </div>
  );
};

export default ProductPreview;
