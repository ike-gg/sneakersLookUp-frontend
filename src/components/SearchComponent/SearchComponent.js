import React from "react";
import "./SearchComponent.css";

import Nav from "../Nav/Nav.js";
import SearchResult from "./SearchResult/SearchResult.js";

import data from "./static.json";

const SearchComponent = (props) => {
  const { setTrackingItems } = props;

  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(data);
  const [debounceSearch, setDebounceSearch] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState("");

  const debounceTimeout = () =>
    setTimeout(() => {
      if (search.length > 3) {
        console.log("calling api!");
        fetch(
          // `https://sneakerslookup-backend.herokuapp.com/api/getProduct/?q=${search}`
          `http://192.168.8.136:3001/api/getProduct/?q=${search}`
        )
          .then((data) => data.json())
          .then((data) => {
            setSearchResult(data);
            console.log(JSON.stringify(data));
          });
      }
    }, 400);

  const handleChange = (event) => {
    setSearch(event.target.value);
    if (debounceSearch) {
      clearTimeout(debounceSearch);
    }
    setDebounceSearch(debounceTimeout());
  };

  const addToTracking = () => {
    setSelectedSize("");
    const indexOfSize = searchResult.sizes.findIndex(
      (size) => size.sizeUS === selectedSize
    );
    if (indexOfSize !== -1) {
      setTrackingItems((prevTrackingItems) => [
        ...prevTrackingItems,
        {
          sku: searchResult.sku,
          name: searchResult.name,
          image: searchResult.image,
          retail: searchResult.retail,
          colorway: searchResult.colorway,
          seller: searchResult.seller,
          size: searchResult.sizes[indexOfSize],
        },
      ]);
    }
  };

  return (
    <section className="searchComponent">
      <Nav />
      <div className="searchComponent__searchBox">
        <input
          type="text"
          className="searchComponent__input"
          placeholder="🔍 Search for sneakers, model, color or even sku!"
          value={search}
          onChange={handleChange}
        />
        {/* <SearchResult
          {...data}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
        <div className="searchComponent__trackingButton">
          <button
            className={selectedSize ? "" : "disabledButton"}
            onClick={addToTracking}
          >
            Add it as tracking!
          </button>
          {!selectedSize && (
            <div className="searchComponent__trackingWarning">
              Select size before adding it for tracking
            </div>
          )}
        </div> */}
        {!(JSON.stringify(searchResult) === "{}") && (
          <SearchResult
            {...searchResult}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        )}
        {!(JSON.stringify(searchResult) === "{}") && (
          <div className="searchComponent__trackingButton">
            <button
              className={selectedSize ? "" : "disabledButton"}
              onClick={addToTracking}
            >
              Add it as tracking!
            </button>
            {!selectedSize && (
              <div className="searchComponent__trackingWarning">
                Select size before adding it for tracking
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchComponent;
