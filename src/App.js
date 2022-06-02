import React from "react";
import "./style.css";

import SearchComponent from "./components/SearchComponent/SearchComponent.js";
import TrackComponent from "./components/TrackComponent/TrackComponent.js";

const App = () => {
  return (
    <div className="container">
      <TrackComponent />
      <SearchComponent />
    </div>
  );
};

export default App;
