import React, { useContext } from "react";
import { motion } from "framer-motion/dist/framer-motion";

import "./WelcomeWindow.css";

import EssentialsContext from "../../context/EssentialsContext";

const WelcomeWindow = () => {
  const { setUserPreferences } = useContext(EssentialsContext);

  const closeWelcomeWindow = () => {
    setUserPreferences((prevPreferences) => {
      return {
        ...prevPreferences,
        firstLaunch: false,
      };
    });
  };

  return (
    <motion.section
      className="welcome__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="welcome__box"
        initial={{ opacity: 0, transform: "translateY(-20px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="welcome__title">
          Welcome{" "}
          <span role="img" aria-label="emoji">
            👋
          </span>
        </h1>
        <p>
          Nice to meet you! Here's my app named Sneakers Look Up. Here you can
          track prices of your favourite shoes from StockX platform. <br />
          Keep in mind with some features of app:
        </p>
        <ul className="welcome__list">
          <li>
            <span role="img" aria-label="emoji">
              🔍
            </span>
            <span>
              You can search for any sneakers you want using right panel,
              remember to be specific, app can show you only one item per search
              request!
            </span>
          </li>
          <li>
            <span role="img" aria-label="emoji">
              👟
            </span>
            <span>
              Pick a size that you want to track, and click "Add it as tracking"
              button.
            </span>
          </li>
          <li>
            <span role="img" aria-label="emoji">
              ✅
            </span>
            <span>
              Now you can easily check prices of saved sneakers on left panel.
            </span>
          </li>
          <li>
            <span role="img" aria-label="emoji">
              🛠️
            </span>
            <span>
              In settings you can choose prefered currency and shoe size metric!
            </span>
          </li>
          <li className="welcome__warning">
            <span role="img" aria-label="emoji">
              ⚠️
            </span>
            <span>
              Be aware that the API that my app uses can be limited easily so I
              recommend that to host the backend yourself.{" "}
              <a href="https://github.com/ike-gg/sneakersLookUp-backend">
                Repo here.
              </a>
            </span>
          </li>
        </ul>
        <div className="welcome__buttonContainer">
          <button onClick={closeWelcomeWindow}>
            Continue <i className="uil uil-arrow-right"></i>
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default WelcomeWindow;
