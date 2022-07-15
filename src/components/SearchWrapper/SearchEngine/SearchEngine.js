import React, { useState, useEffect, useContext } from "react";
import { useDebounce } from "use-debounce";

import SearchSuggestions from "./SearchSuggestions";

import EssentialsContext from "../../../context/EssentialsContext";

const SearchEngine = ({ setSearchResult }) => {
  const { endpointApi } = useContext(EssentialsContext);

  const [query, setQuery] = useState("");
  const [debounceQuery] = useDebounce(query, 300);

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleSearchBox = (event) => {
    const { value } = event.target;
    setQuery(value);
    if (value.length > 3) {
      setSearchResult({
        status: "fetching",
        item: {},
      });
    } else if (value.length <= 3) {
      setSearchResult({
        status: "more",
        item: {},
      });
    }
  };

  useEffect(() => {
    if (debounceQuery.length > 3) {
      fetch(`${endpointApi}/api/getProduct/?q=${debounceQuery}`)
        .then((response) => response.json())
        .then((data) => {
          if ("image" in data) {
            handleResponse(data);
          } else {
            setSearchResult({
              status: "error403",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          setSearchResult({
            status: "error",
          });
        });
    }
  }, [debounceQuery]);

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

  return (
    <section
      className="searchComponent__search"
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
    >
      <input
        type="search"
        className="searchComponent__input"
        placeholder="🔍 Search for sneakers, model, color or even sku!"
        value={query}
        onChange={handleSearchBox}
      />
      {focused && <SearchSuggestions setQuery={setQuery} />}
    </section>
  );
};

export default SearchEngine;
