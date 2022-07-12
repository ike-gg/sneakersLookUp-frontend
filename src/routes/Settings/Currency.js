import React, { useContext } from "react";

import EssentialsContext from "../../context/EssentialsContext";

const Currency = () => {
  const { currencyRates, userPreferences, setUserPreferences } = useContext(
    EssentialsContext
  );

  const userCurrency = userPreferences.currency;
  const availableCurrencies = Object.keys(currencyRates);

  const setCurrency = (event) => {
    const currency = event.target.value;
    setUserPreferences((prevPreferences) => {
      return {
        ...prevPreferences,
        currency,
      };
    });
  };

  return (
    <li>
      <p>Set currency.</p>
      <select
        value={userCurrency}
        onChange={setCurrency}
        className="smallButton infoButton likeButton"
      >
        {availableCurrencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
        {availableCurrencies.length === 0 && <option value="EUR">EUR</option>}
      </select>
    </li>
  );
};

export default Currency;
