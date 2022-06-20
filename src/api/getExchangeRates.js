const getExchangeRates = async (endpoint) => {
  try {
    const response = await fetch(`${endpoint}/api/getExchangeRates`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default getExchangeRates;
