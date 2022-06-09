import React, { useState } from "react";
import "./SearchWrapper.css";

import Nav from "../Nav/Nav.js";
import SearchResult from "./SearchResult/SearchResult";
import SearchStatus from "./SearchStatus/SearchStatus";
import TrackingButton from "./TrackingButton/TrackingButton";

//static data development
import data from "./static.json";

const SearchComponent = (props) => {
  const { trackingItems, setTrackingItems } = props;
  const { endpointApi } = props;
  const { userPreferences } = props;

  //query of search box
  const [search, setSearch] = useState("");

  //debounce search api calls to prevent limitation
  const [debounceSearch, setDebounceSearch] = useState();

  //size of sneakers selecting
  const [selectedSize, setSelectedSize] = useState();

  //results of fetching API with query from search state
  const [searchResult, setSearchResult] = useState({
    status: "found",
    item: data,
  });

  //debounce search api calls to prevent limitation
  const debounceAPICall = () => {
    return setTimeout(() => {
      fetch(`${endpointApi}/api/getProduct/?q=${search}`)
        .then((response) => response.json())
        .then((data) => {
          handleResponse(data);
        })
        .catch((error) => {
          console.error(error);
          setSearchResult({
            status: "error",
          });
        });
    }, 400);
  };

  //handle response from API
  const handleResponse = (response) => {
    //check if response is empty object
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

  const handleSearchBox = (event) => {
    setSearch(event.target.value);
    if (search.length > 3) {
      if (debounceSearch) clearTimeout(debounceSearch);
      setSearchResult({
        status: "fetching",
        item: {},
      });
      //check if there is an timeout to be executed,
      //if so, clear it and make call with new query.
      setDebounceSearch(debounceAPICall());
    } else if (search.length <= 3 || search === "") {
      if (debounceSearch) clearTimeout(debounceSearch);
      setSearchResult({
        status: "more",
        item: {},
      });
    }
  };

  const addItemToTracking = () => {
    const indexOfSizeInSizesArray = searchResult.item.sizes.findIndex(
      (size) => size.sizeUS === selectedSize
    );
    if (indexOfSizeInSizesArray !== -1) {
      const idForTrackedItem = trackingItems.length + 1;
      searchResult.item.size = searchResult.item.sizes[indexOfSizeInSizesArray];
      setTrackingItems((prevTrackingItems) => [
        ...prevTrackingItems,
        {
          id: idForTrackedItem,
          ...searchResult.item,
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
          onChange={handleSearchBox}
        />
        {searchResult.status === "found" && (
          <>
            <SearchResult
              {...searchResult.item}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              userPreferences={userPreferences}
            />
            <TrackingButton
              addItemToTracking={addItemToTracking}
              selectedSize={selectedSize}
            />
          </>
        )}
        {!(searchResult.status === "found") && (
          <SearchStatus search={searchResult.status} />
        )}
      </div>
    </section>
  );
};

export default SearchComponent;
