import { findStore } from "./store.repository.js";

export const insertReview = async (storeId, reviewData) => {
  const store = await findStore(storeId);
  if (!store) return null;

  if (!store.reviews) store.reviews = [];
  const newReview = { id: store.reviews.length + 1, ...reviewData };
  store.reviews.push(newReview);
  return newReview;
};
