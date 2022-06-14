import React, { useContext } from "react";

import "./SizeTable.css";

import EssentialsContext from "../../../../context/EssentialsContext";

const SizeTable = ({ sizes, selectedSize, setSelectedSize }) => {
  const { currencyRates, userPreferences } = useContext(EssentialsContext);
  const { shoeSizeMetric, currency } = userPreferences;
  const userCurrencyRate = currencyRates[currency];

  const exchangeCurrency = (price) => {
    if (price && typeof price === "number") {
      price *= userCurrencyRate;
      price = price.toFixed(2);
    } else {
      price = "—";
    }
    return price;
  };

  const handleSelectSize = (event) => {
    setSelectedSize(event.currentTarget.dataset.size);
  };

  return (
    <main className="SalesTable">
      <section className="SalesTable__container">
        <div className="SalesTable__header">
          <div className="SalesTable__header--cell">Size {shoeSizeMetric}</div>
          <div className="SalesTable__header--cell">Lowest ASK</div>
          <div className="SalesTable__header--cell">Highest BID</div>
        </div>
        {sizes.map((size, index) => {
          const lowestAsk = exchangeCurrency(size.lowestAsk);
          const highestBid = exchangeCurrency(size.highestBid);
          const sneakerSize = size[`size${shoeSizeMetric}`];
          return (
            <div
              key={index}
              className={
                selectedSize === size.sizeUS
                  ? "SalesTable__row SalesTable__row--selected"
                  : "SalesTable__row"
              }
              data-size={size.sizeUS}
              onClick={handleSelectSize}
            >
              <div className="SalesTable__body--size">{sneakerSize}</div>
              <div className="SalesTable__body--ask">
                {lowestAsk}{" "}
                <span className="SalesTable__currency">{currency}</span>
              </div>
              <div className="SalesTable__body--bid">
                {highestBid}{" "}
                <span className="SalesTable__currency">{currency}</span>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default SizeTable;
