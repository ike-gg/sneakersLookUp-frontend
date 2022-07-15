import React from "react";

import "./SearchEngine.css";

import UserInterest from "./UsersInterest";

const SearchSuggestions = ({ setQuery, onFocus, onBlur }) => {
  const addToQuery = (event) => {
    const { textContent } = event.target;
    setQuery(`${textContent} `);
  };

  return (
    <section className="search__suggestions onStartDown">
      <h5 className="search__suggestions--title">
        suggestions based on users interest
      </h5>
      <div className="suggestions__container">
        {UserInterest.map((suggestion, index) => {
          return (
            <div
              className="search__suggestion"
              key={index}
              onFocus={onFocus}
              onBlur={onBlur}
              onClick={addToQuery}
            >
              {suggestion}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SearchSuggestions;
