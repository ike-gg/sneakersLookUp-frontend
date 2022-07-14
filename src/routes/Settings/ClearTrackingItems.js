import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import EssentialsContext from "../../context/EssentialsContext.js";

const ClearTrackingItems = () => {
  const { setTrackingItems, setUserPreferences } = useContext(
    EssentialsContext
  );

  const navigate = useNavigate();

  const deleteAllAppData = () => {
    const promptMessage =
      "Are you sure you want to delete ALL your tracking items?";
    if (window.confirm(promptMessage)) {
      setTrackingItems([]);
      setUserPreferences((prevState) => {
        return {
          ...prevState,
          firstLaunch: true,
        };
      });
      navigate("/", { replace: true });
    }
  };
  return (
    <li>
      <p>Delete all app data.</p>
      <button className="smallButton dangerButton" onClick={deleteAllAppData}>
        Delete <i className="uil uil-trash-alt"></i>
      </button>
    </li>
  );
};

export default ClearTrackingItems;
