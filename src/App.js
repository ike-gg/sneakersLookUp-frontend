import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate, HashRouter } from "react-router-dom";

import "./style.css";

import SearchWrapper from "./components/SearchWrapper/SearchWrapper.js";
import TrackWrapper from "./components/TrackWrapper/TrackWrapper.js";

import Settings from "./routes/Settings/Settings";
import TrackingItem from "./routes/TrackingItem/TrackingItem";

const App = () => {
  const [trackingItems, setTrackingItems] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    shoeSizeMetric: `US`,
    currency: `EUR`,
  });
  const [currencyRates, setCurrencyRates] = useState({});
  // endpoint for api, due to possible limitation of my free-hosted backend on heroku.
  // can be changed in settings.
  const [endpointApi, setEndpointApi] = useState(
    "https://sneakerslookup-backend.herokuapp.com"
  );

  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);

  useEffect(() => {
    setInterval(() => {
      fetch(`${endpointApi}/api/getExchangeRates`)
        .then((res) => res.json())
        .then((data) => {
          setCurrencyRates(data);
        });
    }, 1000 * 5);

    //load all data from localstorage
    const localTrackingItems = localStorage.getItem("trackingItems");
    if (localTrackingItems) {
      setTrackingItems(JSON.parse(localTrackingItems));
    }

    const localEndpointApi = localStorage.getItem("endpointAPI");
    if (localEndpointApi) {
      setEndpointApi(localEndpointApi);
    }

    const localUserPreferences = localStorage.getItem("userPreferences");
    if (localUserPreferences) {
      setUserPreferences(JSON.parse(localUserPreferences));
    }
    // when data from localstorage is loaded, value
    // changes due to preexecuting router function that
    // makes the program crash because the array before
    // loading from localStorage is empty.
    // look down to route with path="trackingItem/:trackingId"
    setLocalStorageLoaded(true);
  }, []);

  useEffect(() => {
    // on any change with states in array,
    // localStorage will be updated and replaced.
    localStorage.setItem("trackingItems", JSON.stringify(trackingItems));

    localStorage.setItem("endpointAPI", endpointApi);

    localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
  }, [trackingItems, endpointApi, userPreferences]);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <section className="container">
              <Outlet />
              <TrackWrapper
                trackingItems={trackingItems}
                setTrackingItems={setTrackingItems}
                userPreferences={userPreferences}
              />
              <SearchWrapper
                trackingItems={trackingItems}
                setTrackingItems={setTrackingItems}
                endpointApi={endpointApi}
                userPreferences={userPreferences}
              />
            </section>
          }
        >
          <Route
            path="settings"
            element={
              <Settings
                setTrackingItems={setTrackingItems}
                endpointApi={endpointApi}
                setEndpointApi={setEndpointApi}
                userPreferences={userPreferences}
                setUserPreferences={setUserPreferences}
              />
            }
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
                  endpointApi={endpointApi}
                  userPreferences={userPreferences}
                />
              )
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
