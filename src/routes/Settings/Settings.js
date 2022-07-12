import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Settings.css";

import settingsData from "./SettingsData";

import SizeMetric from "./SizeMetric/SizeMetric";
import Currency from "./Currency";
import ChangeEndpoint from "./ChangeEndpoint";
import ClearTrackingItems from "./ClearTrackingItems";
import SettingsLine from "./SettingsLine";

const Settings = (props) => {
  const navigate = useNavigate();

  const closeSettings = (event) => {
    const { currentTarget, target } = event;
    if (currentTarget === target) {
      navigate("/", { replace: true });
    }
  };

  return (
    <section className="settings__container" onClick={closeSettings}>
      <main className="settings__box">
        <nav className="settings__titleBox">
          <h1 className="settings__title">Settings</h1>
          <i
            className="uil uil-multiply settings__closeButton"
            onClick={closeSettings}
          />
        </nav>
        <ul className="settings__list">
          {settingsData.map((props) => {
            return <SettingsLine {...props} />;
          })}
          <hr />
          <ChangeEndpoint />
          <SizeMetric />
          <Currency />
          <ClearTrackingItems />
        </ul>
      </main>
    </section>
  );
};

export default Settings;
