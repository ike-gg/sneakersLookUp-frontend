import React, { useContext } from "react";

import EssentialsContext from "../../context/EssentialsContext.js";

const ClearTrackingItems = () => {
  const { setTrackingItems } = useContext(EssentialsContext);
  const deleteAllTrackingItems = () => {
    const promptMessage =
      "Are you sure you want to delete ALL your tracking items?";
    if (window.confirm(promptMessage)) setTrackingItems([]);
  };
  return (
    <li>
      <p>Delete all tracking items.</p>
      <button
        className="smallButton dangerButton"
        onClick={deleteAllTrackingItems}
      >
        Delete <i className="uil uil-trash-alt"></i>
      </button>
    </li>
  );
};

export default ClearTrackingItems;
