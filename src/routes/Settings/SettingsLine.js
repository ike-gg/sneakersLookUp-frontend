import React from "react";

const SettingsLine = ({ title, link, icon, button }) => {
  return (
    <li>
      <p>{title}</p>
      <a
        href={link}
        rel="noopener noreferrer"
        target="_blank"
        className="smallButton infoButton likeButton"
      >
        {button} <i className={icon}></i>
      </a>
    </li>
  );
};

export default SettingsLine;
