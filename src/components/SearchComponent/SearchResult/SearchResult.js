import React from "react";
import "./SearchResult.css";
import Draggable from "react-draggable";

const SearchResult = (props) => {
  const [selectedSize, setSelectedSize] = React.useState({});

  const handleSelectSize = (event) => {
    event.preventDefault();

    console.log(event.target);
  };

  return (
    <div className="SearchResult__element">
      <div className="SearchResult__box">
        <div className="SearchResult__iteminfo">
          <div className="SearchResult__iteminfo--stickyContainer">
            <div className="SearchResult__iteminfo--priceLabel">
              Retail: {props.retail ? `${props.retail} €` : "— €"}
            </div>
            <img alt="xd" src={props.image}></img>
            <h1 className="SearchResult__title">{props.name}</h1>
            <h3 className="SearchResult__desc">
              <div className="SearchResult__desc--seller">
                By {props.seller}
              </div>{" "}
              CW: {props.colorway}
            </h3>
            <h6 className="SearchResult__sku">SKU: {props.sku}</h6>
          </div>
        </div>
        <div className="SearchResult__sales">
          <table className="SearchResult__table">
            <tbody>
              <tr className="SearchResult__table--header">
                <th>Size US — EU</th>
                <th>Lowest ASK</th>
                <th>Highest BID</th>
              </tr>
              {props.sizes.map((size) => {
                return (
                  <tr key={props.sku + size.sizeUS} onClick={handleSelectSize}>
                    <td>
                      {size.sizeUS} — {size.sizeEU}
                    </td>
                    <td>{size.lowestAsk}€</td>
                    <td>{size.highestBid}€</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
