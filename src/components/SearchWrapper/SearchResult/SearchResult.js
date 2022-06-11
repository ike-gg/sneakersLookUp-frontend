import React, { useContext } from "react";

import "./SearchResult.css";

import ProductPreview from "../../ProductPreview/ProductPreview";

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
        <ProductPreview product={item} labelType="size" />
        <main className="SearchResult__sales">
          <table className="SearchResult__table">
            <tbody>
              <tr className="SearchResult__table--header">
                <th>Size {shoeSizeMetric}</th>
                <th>Lowest ASK</th>
                <th>Highest BID</th>
              </tr>
              {item.sizes.map((size, index) => {
                let { lowestAsk, highestBid } = size;
                if (currencyRates[currency]) {
                  lowestAsk *= currencyRates[currency].toFixed(2);
                  highestBid *= currencyRates[currency].toFixed(2);
                }
                return (
                  <tr
                    key={index}
                    data-size={size.sizeUS}
                    onClick={handleSelectSize}
                    className={
                      size.sizeUS === selectedSize ? "selectedSize" : ""
                    }
                  >
                    <td className="SearchResult__sizeColumn">
                      <span>{size[`size${shoeSizeMetric}`]}</span>
                    </td>
                    <td>
                      {lowestAsk
                        ? `${lowestAsk} ${(
                            <span className="SearchResult__currency">
                              {currency}
                            </span>
                          )}`
                        : "—"}
                    </td>
                    <td>
                      {highestBid
                        ? `${highestBid} ${(
                            <span className="SearchResult__currency">
                              {currency}
                            </span>
                          )}`
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
      </div>
    </section>
  );
};

export default SearchResult;
