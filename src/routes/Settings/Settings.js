import React from "react";
import { useNavigate } from "react-router-dom";
// import Fade from "react-reveal/Fade";

import "./Settings.css";

const Settings = (props) => {
  const { setTrackingItems } = props;

  const navigate = useNavigate();

  const closeSettings = (event) => {
    const { currentTarget, target } = event;
    if (currentTarget === target) {
      navigate("/", { replace: true });
    }
  };

  const deleteAllTrackingItems = () => {
    if (
      window.confirm("Are you sure you want to delete ALL your tracking items?")
    ) {
      setTrackingItems([]);
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
          <li>
            <p>Visit author GitHub.</p>
            <a
              href="https://github.com/ike-gg"
              rel="noopener noreferrer"
              target="_blank"
              className="smallButton infoButton likeButton"
            >
              GitHub
            </a>
          </li>
          <li>
            <p>Visit repo of this project on GitHub.</p>
            <a
              href="https://github.com/ike-gg/sneakersLookUp-frontend"
              rel="noopener noreferrer"
              target="_blank"
              className="smallButton infoButton likeButton"
            >
              GitHub repo
            </a>
          </li>
          <li>
            <p>Want to report a bug?</p>
            <a
              href="mailto:ernestee@icloud.com"
              className="smallButton infoButton likeButton"
            >
              Send mail
            </a>
          </li>
          <li>
            <p>Delete all tracking items.</p>
            <button
              className="smallButton dangerButton"
              onClick={deleteAllTrackingItems}
            >
              Delete
            </button>
          </li>
        </ul>
      </main>
    </section>
  );
};

export default Settings;
