import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import EssentialsContext from "../../../context/EssentialsContext";

const ActionButtons = ({ item }) => {
  const { name, id, url } = item;
  const { setTrackingItems } = useContext(EssentialsContext);
  const navigate = useNavigate();

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete ${name} item?`)) {
      setTrackingItems((prevState) => {
        const indexOfItem = prevState.findIndex((items) => items.id === id);
        prevState.splice(indexOfItem, 1);
        return [...prevState];
      });
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="trackingItems__buttons">
      <button
        onClick={handleRemove}
        className="smallButton dangerButton trackingItems__removeButton"
      >
        Remove item <i className="uil uil-trash-alt"></i>
      </button>
      <a
        className="smallButton likeButton"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Link to StockX <i className="uil uil-external-link-alt"></i>
      </a>
    </div>
  );
};

export default ActionButtons;
