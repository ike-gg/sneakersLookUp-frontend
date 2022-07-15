import React from "react";

const statuses = {
  empty: {
    icon: <i className="uil uil-times searchStatus__icon" />,
    text: (
      <>
        We didn't find anything with your phrase, please try again.
        <br />
        Maybe API is being limited? Check settings.
      </>
    ),
  },
  fetching: {
    icon: <i className="uil uil-sync spinning searchStatus__icon" />,
    text: `Fetching data..`,
  },
  more: {
    icon: <i className="uil uil-keyboard searchStatus__icon" />,
    text: `We need more information! Enter more details.`,
  },
  init: {
    icon: <i className="uil uil-search-alt searchStatus__icon" />,
    text: `Feel free to find your sneakers using search box above.`,
  },
  error403: {
    icon: <i className="uil uil-exclamation-triangle searchStatus__icon" />,
    text: `API responded with 403 code. Please try again in a while.`,
  },
  error: {
    icon: <i className="uil uil-exclamation-triangle searchStatus__icon" />,
    text: (
      <>
        Something went wrong.
        <br />
        Check if correct api endpoint was provided.
      </>
    ),
  },
};

const getStatusResources = (status) => {
  if (status in statuses) {
    return statuses[status];
  } else {
    return statuses.error;
  }
};

export default getStatusResources;
