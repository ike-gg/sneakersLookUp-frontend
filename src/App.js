import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import "./style.css";

import SearchComponent from "./components/SearchComponent/SearchComponent.js";
import TrackComponent from "./components/TrackComponent/TrackComponent.js";

const App = () => {
  const [trackingItems, setTrackingItems] = React.useState([]);

  useEffect(() => {
    const localTrackingItems = localStorage.getItem("trackingItems");
    if (localTrackingItems) {
      setTrackingItems(JSON.parse(localTrackingItems));
    }
  }, []);

  useEffect(() => {
    const stringifyTrackingItems = JSON.stringify(trackingItems);
    localStorage.setItem("trackingItems", stringifyTrackingItems);
  }, [trackingItems]);

  return (
    <div className="container">
      <Outlet />
      <TrackComponent
        trackingItems={trackingItems}
        setTrackingItems={setTrackingItems}
      />
      <SearchComponent setTrackingItems={setTrackingItems} />
    </div>
  );
};

export default App;
