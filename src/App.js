import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate, HashRouter } from "react-router-dom";

import "./style.css";

import SearchWrapper from "./components/SearchWrapper/SearchWrapper";
import TrackWrapper from "./components/TrackWrapper/TrackWrapper";
import ErrorPopUp from "./components/ErrorPopUp/ErrorPopUp";

import Settings from "./routes/Settings/Settings";
import TrackingItem from "./routes/TrackingItem/TrackingItem";

import EssentialsContext from "./context/EssentialsContext";

import staticTrackingItems from "./data/staticTrackingItems.json";

import { getExchangeRates } from "./api/apiCalls";

const App = () => {
  const [error, setError] = useState({
    title: "Error",
    desc: "",
  });
  const [trackingItems, setTrackingItems] = useState(staticTrackingItems);
  const [userPreferences, setUserPreferences] = useState({
    shoeSizeMetric: `US`,
    currency: `EUR`,
  });
  const [currencyRates, setCurrencyRates] = useState({
    CHF: 1.013381,
    EUR: 1,
    GBP: 0.859326,
    PLN: 4.698298,
    USD: 1.05368,
  });
  const [endpointApi, setEndpointApi] = useState(
    "https://sneakerslookup-backend.herokuapp.com"
  );

  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);

  const localStoredStates = [
    ["trackingItems", trackingItems, setTrackingItems],
    ["userPreferences", userPreferences, setUserPreferences],
    ["currencyRates", currencyRates, setCurrencyRates],
    ["endpointApi", endpointApi, setEndpointApi],
  ];

  useEffect(() => {
    localStoredStates.forEach(([nameState, state, setState]) => {
      const storedState = localStorage.getItem(nameState);
      if (storedState) {
        setState(JSON.parse(storedState));
      }
    });
    setError({
      title: "😭 😥 😢",
      desc:
        "Bad news, the scraper I was using for scraping data from StockX probably passed away. So I have stopped working on further updates. Also, due to the backend is down, I set static exchange rates by today (24.06.2022).",
    });
    setLocalStorageLoaded(true);
  }, []);

  useEffect(() => {
    if (localStorageLoaded) {
      // const fetchExchangeRates = () => {
      //   getExchangeRates(endpointApi)
      //     .then((data) => {
      //       setCurrencyRates(data);
      //     })
      //     .catch((error) => {
      //       setError({
      //         title: "Error",
      //         desc: "Could not load exchange rates, switching to EUR instead.",
      //       });
      //       setCurrencyRates({ EUR: "1.00" });
      //       setUserPreferences((prevPreferences) => {
      //         return {
      //           ...prevPreferences,
      //           currency: "EUR",
      //         };
      //       });
      //     });
      // };
      // fetchExchangeRates();
      // setInterval(fetchExchangeRates, 1000 * 60 * 10);
    }
  }, [localStorageLoaded]);

  useEffect(() => {
    if (localStorageLoaded) {
      localStoredStates.forEach(([nameState, state, setState]) => {
        localStorage.setItem(nameState, JSON.stringify(state));
      });
    }
  }, [trackingItems, endpointApi, userPreferences, currencyRates]);

  const EssentialsStates = {
    trackingItems,
    setTrackingItems,
    currencyRates,
    userPreferences,
    setUserPreferences,
    endpointApi,
    setEndpointApi,
    setError,
  };

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
                {error.desc && (
                  <ErrorPopUp title={error.title} desc={error.desc} />
                )}
              </section>
            }
          >
            <Route path="settings" element={<Settings />}></Route>
            <Route
              path="trackingItem/:trackingId"
              element={localStorageLoaded && <TrackingItem />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Routes>
      </EssentialsContext.Provider>
    </HashRouter>
  );
};

export default App;
