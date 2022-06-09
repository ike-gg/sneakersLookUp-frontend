import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SizeMetric from "./SizeMetric/SizeMetric";

import "./Settings.css";

const Settings = (props) => {
  const { setTrackingItems } = props;
  const { endpointApi, setEndpointApi } = props;
  const { userPreferences, setUserPreferences } = props;

  const [apiInfoToggle, setApiInfoToggle] = useState(false);
  const navigate = useNavigate();

  const closeSettings = (event) => {
    const { currentTarget, target } = event;
    if (currentTarget === target) {
      navigate("/", { replace: true });
    }
  };

  const deleteAllTrackingItems = () => {
    const promptMessage =
      "Are you sure you want to delete ALL your tracking items?";
    if (window.confirm(promptMessage)) setTrackingItems([]);
  };

  const changeEndpointAPI = () => {
    const newEndpoint = prompt(
      `Here you can enter new endpoint for API that this app uses.
You should enter ip with port for example: 
http://192.1.1.1:3001 or even http://localhost:3001

Leave prompt blank to restore default settings.`,
      endpointApi
    );
    if (newEndpoint) {
      setEndpointApi(newEndpoint);
    } else {
      setEndpointApi("https://sneakerslookup-backend.herokuapp.com");
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
            <p>
              Backend source.
              <i
                onClick={() => {
                  setApiInfoToggle((prevState) => !prevState);
                }}
                className="uil uil-info-circle moreInfo"
              />
              (Current: {endpointApi})
            </p>
            <button className="smallButton" onClick={changeEndpointAPI}>
              Set endpoint <i className="uil uil-link"></i>
            </button>
          </li>
          {apiInfoToggle && (
            <li className="apiinformation">
              <p>
                Due to limation of unofficial StockX API its highly possible
                that my free heroku-hosted API will be limited and this could
                cause the app will be unusable. In this case you should download
                API locally from{" "}
                <a
                  href="https://github.com/ike-gg/sneakersLookUp-backend"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  my repo here
                </a>{" "}
                and select endpoint clicking "Set endpoint" button.
              </p>
            </li>
          )}
          <SizeMetric
            setUserPreferences={setUserPreferences}
            userPreferences={userPreferences}
          />
          <li>
            <p>Visit author GitHub.</p>
            <a
              href="https://github.com/ike-gg"
              rel="noopener noreferrer"
              target="_blank"
              className="smallButton infoButton likeButton"
            >
              GitHub <i className="uil uil-external-link-alt"></i>
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
              GitHub repo <i className="uil uil-external-link-alt"></i>
            </a>
          </li>
          <li>
            <p>Want to report a bug?</p>
            <a
              href="mailto:ernestee@icloud.com"
              className="smallButton infoButton likeButton"
            >
              Send mail <i className="uil uil-envelope"></i>
            </a>
          </li>
          <li>
            <p>Delete all tracking items.</p>
            <button
              className="smallButton dangerButton"
              onClick={deleteAllTrackingItems}
            >
              Delete <i className="uil uil-trash-alt"></i>
            </button>
          </li>
        </ul>
      </main>
    </section>
  );
};

export default Settings;
