import { insertReview } from "../repositories/review.repository.js";

// 가게에 리뷰 추가
export const addStoreReview = async (storeId, reviewData) => {
  return await insertReview(storeId, reviewData);
};
