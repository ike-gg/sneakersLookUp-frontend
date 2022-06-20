const getProduct = async (endpoint, query) => {
  try {
    const response = await fetch(`${endpoint}/api/getProduct/?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default getProduct;
