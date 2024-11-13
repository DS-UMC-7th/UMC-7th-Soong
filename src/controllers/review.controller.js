import { CreateReviewDTO } from "../dtos/review.dto.js";
import { addStoreReview } from "../services/review.service.js";
import { findStoreById } from "../services/store.service.js";

export const addReview = async (req, res) => {
  try {
    const { storeId } = req.params;
    const reviewData = CreateReviewDTO.validate(req.body);

    const store = await findStoreById(storeId);
    if (!store) throw new NotFoundError("Store not found");

    const newReview = await addStoreReview(storeId, reviewData);
    res.status(201).json({ status: "success", message: "Review added", data: newReview });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
