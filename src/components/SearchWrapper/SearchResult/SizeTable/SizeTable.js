import React, { useContext } from "react";

import "./SizeTable.css";

import EssentialsContext from "../../../../context/EssentialsContext";

const SizeTable = ({ sizes }) => {
  const { currencyRates, userPreferences } = useContext(EssentialsContext);
  const { shoeSizeMetric, currency } = userPreferences;

  const allSizes = sizes.map((size) => {
    let { lowestAsk, highestBid } = size;
    lowestAsk = (lowestAsk * currencyRates[currency]).toFixed(2);
    highestBid = (highestBid * currencyRates[currency]).toFixed(2);
    console.log(size);
    let sneakerSize = size[`${size}shoeSizeMetric`];
    console.log(sneakerSize);
    return <h1>{size}</h1>;
  });

  console.log(allSizes);

  return (
    <main className="SearchResult__sales">
      <section className="SearchResult__table">
        {allSizes.map((SizeElement, index) => (
          <div className="SearchResult__table-row" key={index}>
            <SizeElement /> halo
          </div>
        ))}
      </section>
    </main>
  );
};

export default SizeTable;
