import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "./style.css";

import SearchComponent from "./components/SearchComponent/SearchComponent.js";
import TrackComponent from "./components/TrackComponent/TrackComponent.js";

import Settings from "./routes/Settings/Settings";
import TrackingItem from "./routes/TrackingItem/TrackingItem";

const App = () => {
  const [trackingItems, setTrackingItems] = React.useState([]);
  const [localStorageLoaded, setLocalStorageLoaded] = React.useState(false);

  useEffect(() => {
    // check if data in localStorage exists, and if so, load it.
    const localTrackingItems = localStorage.getItem("trackingItems");
    if (localTrackingItems) {
      setTrackingItems(JSON.parse(localTrackingItems));
    }
    // when data from localstorage is loaded, value
    // changes due to preexecuting router function that
    // makes the program crash because the array before
    // loading from localStorage is empty.
    // look down to route with path="trackingItem/:trackingId"
    setLocalStorageLoaded(true);
  }, []);

  useEffect(() => {
    // on any change with session tracking items,
    // localStorage will be updated and replaced.
    const stringifyTrackingItems = JSON.stringify(trackingItems);
    localStorage.setItem("trackingItems", stringifyTrackingItems);
  }, [trackingItems]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <section className="container">
              <Outlet />
              <TrackComponent
                trackingItems={trackingItems}
                setTrackingItems={setTrackingItems}
              />
              <SearchComponent
                trackingItems={trackingItems}
                setTrackingItems={setTrackingItems}
              />
            </section>
          }
        >
          <Route
            path="settings"
            element={<Settings setTrackingItems={setTrackingItems} />}
          ></Route>
          <Route
            path="trackingItem/:trackingId"
            element={
              // conditional rendering due to error with empty
              // array before importing data from localStorage
              localStorageLoaded && (
                <TrackingItem
                  trackingItems={trackingItems}
                  setTrackingItems={setTrackingItems}
                />
              )
            }
          />
        </Route>
        <Route path="*" element={<div>Lol not exist.</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
