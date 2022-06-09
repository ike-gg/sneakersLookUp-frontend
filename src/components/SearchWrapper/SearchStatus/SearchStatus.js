import React from "react";
import getStatusResources from "./SearchStatuses";

import "./SearchStatus.css";

const SearchStatus = (props) => {
  const { search } = props;

  const statusResource = getStatusResources(search);
  const { icon, text } = statusResource;

  return (
    <div className="searchStatus__info">
      {icon}
      <h2 className="searchStatus__textInfo">{text}</h2>
    </div>
  );
};

export default SearchStatus;
