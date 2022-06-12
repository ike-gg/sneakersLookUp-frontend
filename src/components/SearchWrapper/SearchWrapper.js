import React, { useState, useContext } from "react";
import "./SearchWrapper.css";

import NavBar from "./NavBar/NavBar";
import SearchEngine from "./SearchEngine/SearchEngine";
import SearchResult from "./SearchResult/SearchResult";
import SearchStatus from "./SearchStatus/SearchStatus";
import TrackingButton from "./TrackingButton/TrackingButton";

import EssentialsContext from "../../context/EssentialsContext";

//static data development
import data from "./static.json";

const SearchComponent = () => {
  const { trackingItems, setTrackingItems } = useContext(EssentialsContext);

  //size of sneakers selecting
  const [selectedSize, setSelectedSize] = useState();

  //results of fetching API with query from search state
  const [searchResult, setSearchResult] = useState({
    status: "found",
    item: data,
  });

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
      <NavBar />
      <div className="searchComponent__searchBox">
        <SearchEngine setSearchResult={setSearchResult} />
        {searchResult.status === "found" && (
          <>
            <SearchResult
              item={searchResult.item}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
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
