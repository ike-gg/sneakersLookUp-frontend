import React, { useContext } from "react";

import "./ErrorPopUp.css";

import EssentialsContext from "../../context/EssentialsContext";

const ErrorPopUp = ({ title, desc }) => {
  const { setError } = useContext(EssentialsContext);

  const closePopUp = () => {
    setError({ title: "", desc: "" });
  };

  return (
    <section className="error__box" onClick={closePopUp}>
      <h2 className="error__title">
        <i className="uil uil-exclamation-triangle" />
        {title}
      </h2>
      <p className="error__desc">{desc}</p>
      <p className="error_tip">Click this popup to close.</p>
    </section>
  );
};

export default ErrorPopUp;
