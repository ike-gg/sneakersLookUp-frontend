import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App";

import Settings from "./routes/Settings";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="settings" element={<Settings />}></Route>
        <Route path="trackingItem">
          <Route path=":trackingId" />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
