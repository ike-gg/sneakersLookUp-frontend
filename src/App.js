import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate, HashRouter } from "react-router-dom";

import "./style.css";

import SearchWrapper from "./components/SearchWrapper/SearchWrapper";
import TrackWrapper from "./components/TrackWrapper/TrackWrapper";
import ErrorPopUp from "./components/ErrorPopUp/ErrorPopUp";

import Settings from "./routes/Settings/Settings";
import TrackingItem from "./routes/TrackingItem/TrackingItem";

import EssentialsContext from "./context/EssentialsContext";

const App = () => {
  const [error, setError] = useState({
    title: "Error",
    desc: "",
  });
  const [trackingItems, setTrackingItems] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    shoeSizeMetric: `US`,
    currency: `EUR`,
  });
  const [currencyRates, setCurrencyRates] = useState({});
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

    setLocalStorageLoaded(true);
  }, []);

  useEffect(() => {
    if (localStorageLoaded) {
      const fetchExcangeRates = async () => {
        try {
          const response = await fetch(`${endpointApi}/api/getExchangeRates`);
          const data = await response.json();
          setCurrencyRates(data);
        } catch (error) {
          setError({
            title: "Error",
            desc: "Could not load exchange rates, switching to EUR instead.",
          });
          setCurrencyRates({ EUR: "1.00" });
          setUserPreferences((prevPreferences) => {
            return {
              ...prevPreferences,
              currency: "EUR",
            };
          });
        }
      };
      fetchExcangeRates();
      setInterval(fetchExcangeRates, 1000 * 60 * 10);
    }
  }, [localStorageLoaded]);

  useEffect(() => {
    localStoredStates.forEach(([nameState, state, setState]) => {
      localStorage.setItem(nameState, JSON.stringify(state));
    });
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
