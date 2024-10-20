import { CreateStoreDTO } from "../dtos/store.dto.js";
import { createStore } from "../services/store.service.js";

export const addStore = async (req, res) => {
  try {
    const storeData = CreateStoreDTO.validate(req.body);  // DTO로 데이터 검증
    const newStore = await createStore(storeData);
    res.status(201).json(newStore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
