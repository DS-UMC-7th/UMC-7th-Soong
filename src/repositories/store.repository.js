const stores = [];

export const insertStore = async (storeData) => {
  const newStore = { id: stores.length + 1, ...storeData };
  stores.push(newStore);
  return newStore;
};

export const findStore = async (storeId) => {
  return stores.find((store) => store.id === parseInt(storeId));
};
