import React, { useState, useContext } from "react";

import EssentialsContext from "../../context/EssentialsContext.js";

const ChangeEndpoint = () => {
  const { endpointApi, setEndpointApi } = useContext(EssentialsContext);

  const [apiInfoToggle, setApiInfoToggle] = useState(false);

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
      setEndpointApi("https://sneakerslookupbackend.herokuapp.com");
    }
  };
  return (
    <>
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
            Due to limation of unofficial StockX API its highly possible that my
            free heroku-hosted API will be limited and this could cause the app
            will be unusable. In this case you should download API locally from{" "}
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
    </>
  );
};

export default ChangeEndpoint;
