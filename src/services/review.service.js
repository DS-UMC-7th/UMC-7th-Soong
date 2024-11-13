import { insertReview } from "../repositories/review.repository.js";
import { NotFoundError } from "../errors.js";

export const addStoreReview = async (storeId, reviewData) => {
  const result = await insertReview(storeId, reviewData);
  if (!result) throw new NotFoundError("Store not found");
  return result;
};
