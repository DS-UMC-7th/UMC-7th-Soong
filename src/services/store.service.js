import { insertStore, findStore } from "../repositories/store.repository.js";
import { getAllStoreReviews } from "../repositories/review.repository.js";
import { getStoreMissions } from "../repositories/mission.repository.js";
import { responseFromReviews } from "../dtos/review.dto.js";

// 가게 생성 로직
export const createStore = async (storeData) => {
  return await insertStore(storeData);
};

// 가게 ID로 가게 찾기
export const findStoreById = async (storeId) => {
  return await findStore(storeId);
};

// 특정 가게의 리뷰 목록 조회
export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};

// 특정 가게의 미션 목록 조회
export const listStoreMissions = async (storeId) => {
  const missions = await getStoreMissions(storeId);
  return missions;
};
