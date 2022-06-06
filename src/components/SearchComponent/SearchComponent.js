import React from "react";
import "./SearchComponent.css";

import Nav from "../Nav/Nav.js";
import SearchResult from "./SearchResult/SearchResult.js";

import data from "./static.json";

const SearchComponent = (props) => {
  const { trackingItems, setTrackingItems } = props;

  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(data);
  const [debounceSearch, setDebounceSearch] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState("");

  const debounceTimeout = () =>
    setTimeout(() => {
      if (search.length > 3) {
        console.log("calling api!");
        fetch(
          `https://sneakerslookup-backend.herokuapp.com/api/getProduct/?q=${search}`
          // `http://192.168.8.136:3001/api/getProduct/?q=${search}`
        )
          .then((response) => response.json())
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
    const indexOfSizeInShoesArray = searchResult.sizes.findIndex(
      (size) => size.sizeUS === selectedSize
    );
    const idForTrackedItem = trackingItems.length + 1;
    if (indexOfSizeInShoesArray !== -1) {
      const { sku, name, image, retail, colorway, seller, url } = searchResult;
      const size = searchResult.sizes[indexOfSizeInShoesArray];
      setTrackingItems((prevTrackingItems) => [
        ...prevTrackingItems,
        {
          id: idForTrackedItem,
          sku,
          name,
          image,
          retail,
          colorway,
          seller,
          size,
          url,
        },
      ]);
    }
    //clear selected size
    setSelectedSize();
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
