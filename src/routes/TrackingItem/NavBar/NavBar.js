import React from "react";

const NavBar = ({ name, closePopUp }) => {
  return (
    <nav className="trackingItem__nav">
      <h1 className="trackingItem__title">{name}</h1>
      <i
        className="uil uil-multiply trackingItem__closeButton"
        onClick={closePopUp}
      />
    </nav>
  );
};

export default NavBar;
