import { CreateStoreDTO } from "../dtos/store.dto.js";
import { createStore, listStoreReviews } from "../services/store.service.js";

export const addStore = async (req, res) => {
  try {
    const storeData = CreateStoreDTO.validate(req.body);
    const newStore = await createStore(storeData);
    res.status(201).json({ status: "success", message: "Store created", data: newStore });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const handleListStoreReviews = async (req, res) => {
  try {
    const { storeId } = req.params;
    const reviews = await listStoreReviews(storeId);
    res.status(200).json({ status: "success", message: "Reviews fetched", data: reviews });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
