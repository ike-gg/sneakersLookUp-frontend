import React from "react";
import "./SearchComponent.css";

import Nav from "../Nav/Nav.js";
import SearchResult from "./SearchResult/SearchResult.js";

import data from "./static.json";

const SearchComponent = (props) => {
  const { trackingItems, setTrackingItems } = props;
  const { endpointApi } = props;

  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState({
    status: "found",
    item: data,
  });
  const [debounceSearch, setDebounceSearch] = React.useState();
  const [selectedSize, setSelectedSize] = React.useState();

  const debounceTimeout = () => {
    return setTimeout(() => {
      if (search.length > 3) {
        fetch(`${endpointApi}/api/getProduct/?q=${search}`)
          .then((response) => response.json())
          .then((data) => {
            handleResponse(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, 400);
  };

  const handleResponse = (response) => {
    if (JSON.stringify(response) === "{}") {
      setSearchResult({
        status: "empty",
      });
    } else {
      setSearchResult({
        status: "found",
        item: response,
      });
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    if (search.length > 3) {
      setSearchResult({
        status: "fetching",
        item: {},
      });
    } else if (search.length <= 3 || search === "") {
      setSearchResult({
        status: "more",
        item: {},
      });
    }
    if (debounceSearch) {
      clearTimeout(debounceSearch);
    }
    setDebounceSearch(debounceTimeout());
  };

  const addToTracking = () => {
    const indexOfSizeInShoesArray = searchResult.item.sizes.findIndex(
      (size) => size.sizeUS === selectedSize
    );
    const idForTrackedItem = trackingItems.length + 1;
    if (indexOfSizeInShoesArray !== -1) {
      const {
        sku,
        name,
        image,
        retail,
        colorway,
        seller,
        url,
      } = searchResult.item;
      const size = searchResult.item.sizes[indexOfSizeInShoesArray];
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
        {searchResult.status === "found" && (
          <>
            <SearchResult
              {...searchResult.item}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
            <div className="searchComponent__trackingButton">
              <button
                className={selectedSize ? "" : "disabledButton smallButton"}
                onClick={addToTracking}
              >
                <i className="uil uil-plus"></i> Add it as tracking
              </button>
              {!selectedSize && (
                <div className="searchComponent__trackingWarning smallButton">
                  Select size before adding it for tracking
                </div>
              )}
            </div>
          </>
        )}
        {searchResult.status === "empty" && (
          <div className="searchComponent__info">
            <i className="uil uil-times searchComponent__icon"></i>
            <h1 className="searchComponent__textInfo">
              We didn't find anything with your phrase, please try again.
            </h1>
          </div>
        )}
        {searchResult.status === "fetching" && (
          <section className="searchComponent__info">
            <i className="uil uil-sync spinning searchComponent__icon"></i>
            <h1 className="searchComponent__textInfo">Fetching data..</h1>
          </section>
        )}
        {searchResult.status === "more" && (
          <section className="searchComponent__info">
            <i className="uil uil-keyboard searchComponent__icon"></i>
            <h1 className="searchComponent__textInfo">
              We need more information! Enter more details.
            </h1>
          </section>
        )}
        {searchResult.status === "init" && (
          <section className="searchComponent__info">
            <i className="uil uil-search-alt searchComponent__icon"></i>
            <h1 className="searchComponent__textInfo">
              Feel free to find your sneakers using search box above.
            </h1>
          </section>
        )}
      </div>
    </section>
  );
};

export default SearchComponent;
