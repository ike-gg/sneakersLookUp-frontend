import React, { useContext } from "react";

import "./ProductPreview.css";

import ProductLabel from "./ProductLabel/ProductLabel";

const ProductPreview = ({ product, labelType, fontSize }) => {
  const { retail, image, name, seller, colorway, sku } = product;

  return (
    <main className="ProductPreview__iteminfo" style={{ fontSize }}>
      <ProductLabel product={product} labelType={labelType} />
      <img
        className="ProductPreview__image"
        alt="sneakers preview"
        src={image}
      ></img>
      <h2 className="ProductPreview__title">{name}</h2>
      <h3 className="ProductPreview__desc">
        <div className="ProductPreview__desc--seller">By {seller}</div> CW:{" "}
        {colorway}
      </h3>
      <h6 className="ProductPreview__sku">SKU: {sku}</h6>
    </main>
  );
};

export default ProductPreview;
