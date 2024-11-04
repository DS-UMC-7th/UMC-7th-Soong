import { prisma } from "../db.config.js";
import { findStore } from "./store.repository.js";

export const insertReview = async (storeId, reviewData) => {
  const store = await findStore(storeId);
  if (!store) return null;

  try {
    const newReview = await prisma.userStoreReview.create({
      data: {
        storeId: store.id,
        userId: reviewData.userId,
        content: reviewData.content,
      },
    });
    return newReview;
  } catch (error) {
    console.error("Error inserting review:", error);
    throw error;
  }
};
