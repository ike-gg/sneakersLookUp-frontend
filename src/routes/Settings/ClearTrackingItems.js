import React from "react";
import { useNavigate } from "react-router-dom";

const ClearTrackingItems = () => {
  const navigate = useNavigate();

  const deleteAllAppData = () => {
    const promptMessage = "Are you sure you want to delete ALL app data?";
    if (window.confirm(promptMessage)) {
      localStorage.clear();
      navigate("/", { replace: true });
      window.location.reload();
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
