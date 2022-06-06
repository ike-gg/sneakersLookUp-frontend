import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

const Nav = () => {
  return (
    <nav className="mainNav">
      <Link to="settings" className="nav__settingsButton">
        <i className="uil uil-setting"></i>
      </Link>
    </nav>
  );
};

export default Nav;
