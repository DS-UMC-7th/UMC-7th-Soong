import { insertStore, findStore } from "../repositories/store.repository.js";

// 가게 생성 로직
export const createStore = async (storeData) => {
  return await insertStore(storeData);
};

// 가게 ID로 가게 찾기
export const findStoreById = async (storeId) => {
  return await findStore(storeId);
};
