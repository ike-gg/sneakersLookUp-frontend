import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate, HashRouter } from "react-router-dom";

import "./style.css";

import SearchWrapper from "./components/SearchWrapper/SearchWrapper.js";
import TrackWrapper from "./components/TrackWrapper/TrackWrapper.js";

import Settings from "./routes/Settings/Settings";
import TrackingItem from "./routes/TrackingItem/TrackingItem";

import EssentialsContext from "./context/EssentialsContext";

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

  const EssentialsStates = {
    trackingItems,
    setTrackingItems,
    currencyRates,
    userPreferences,
    setUserPreferences,
    endpointApi,
    setEndpointApi,
  };

  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);

  useEffect(() => {
    const fetchExcangeRates = async () => {
      const response = await fetch(`${endpointApi}/api/getExchangeRates`);
      const data = await response.json();
      setCurrencyRates(data);
    };
    fetchExcangeRates();
    setInterval(fetchExcangeRates, 1000 * 30);

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

    const localCurrencyRates = localStorage.getItem("currencyRates");
    if (localCurrencyRates) {
      setCurrencyRates(JSON.parse(localCurrencyRates));
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
    localStorage.setItem("currencyRates", JSON.stringify(currencyRates));
  }, [trackingItems, endpointApi, userPreferences, currencyRates]);

  return (
    <HashRouter>
      <EssentialsContext.Provider value={EssentialsStates}>
        <Routes>
          <Route
            path="/"
            element={
              <section className="container">
                <Outlet />
                <TrackWrapper />
                <SearchWrapper />
              </section>
            }
          >
            <Route path="settings" element={<Settings />}></Route>
            <Route
              path="trackingItem/:trackingId"
              element={
                // conditional rendering due to error with empty
                // array before importing data from localStorage
                localStorageLoaded && <TrackingItem />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Routes>
      </EssentialsContext.Provider>
    </HashRouter>
  );
};

export default App;
