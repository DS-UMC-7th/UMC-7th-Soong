import { insertReview, getMyReviews } from "../repositories/review.repository.js";

// 가게에 리뷰 추가
export const addStoreReview = async (storeId, reviewData) => {
  return await insertReview(storeId, reviewData);
};

// 내가 작성한 리뷰 목록 조회
export const listMyReviews = async (userId) => {
  return await getMyReviews(userId);
};
