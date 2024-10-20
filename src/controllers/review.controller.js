import { CreateReviewDTO } from "../dtos/review.dto.js";
import { addStoreReview } from "../services/review.service.js";
import { findStoreById } from "../services/store.service.js";

export const addReview = async (req, res) => {
  try {
    const { storeId } = req.params;
    const reviewData = CreateReviewDTO.validate(req.body);  // DTO로 데이터 검증

    const store = await findStoreById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const newReview = await addStoreReview(storeId, reviewData);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
