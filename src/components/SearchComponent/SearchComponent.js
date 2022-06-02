import React from "react";
import "./SearchComponent.css";

import Nav from "../Nav/Nav.js";
import SearchResult from "./SearchResult/SearchResult.js";

import data from "./static.json";

const SearchComponent = () => {
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState({});
  const [debounceSearch, setDebounceSearch] = React.useState("");

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
        {/* <SearchResult {...data} /> */}
        {!(JSON.stringify(searchResult) === "{}") && (
          <SearchResult {...searchResult} />
        )}
        {!(JSON.stringify(searchResult) === "{}") && (
          <div className="searchComponent__trackingButton">
            <button className="disabledButton">Add it as tracking!</button>
            <div className="searchComponent__trackingWarning">
              Select size before adding it for tracking
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchComponent;
