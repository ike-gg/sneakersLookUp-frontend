import React from "react";
import { useNavigate } from "react-router-dom";

import "./Settings.css";

const Settings = () => {
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
        <h1 className="settings__title">Settings</h1>
        <ul>
          <li></li>
        </ul>
      </main>
    </section>
  );
};

export default Settings;
