import { insertStore, findStore } from "../repositories/store.repository.js";
import { NotFoundError } from "../errors.js";

export const createStore = async (storeData) => {
  return await insertStore(storeData);
};

export const findStoreById = async (storeId) => {
  const store = await findStore(storeId);
  if (!store) throw new NotFoundError("Store not found");
  return store;
};
