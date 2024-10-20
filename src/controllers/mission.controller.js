import { findStoreById } from "../services/store.service.js";
import { addStoreMission, checkMissionChallenge } from "../services/mission.service.js";

// 가게에 미션 추가 API
export const addMission = async (req, res) => {
  try {
    const { storeId } = req.params;
    const missionData = req.body;

    const store = await findStoreById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const newMission = await addStoreMission(storeId, missionData);
    res.status(201).json(newMission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 가게 미션 도전 API
export const challengeMission = async (req, res) => {
  try {
    const { storeId, missionId } = req.params;

    const missionStatus = await checkMissionChallenge(storeId, missionId);
    if (missionStatus) {
      return res.status(400).json({ message: "Mission already challenged" });
    }

    res.status(200).json({ message: "Mission successfully challenged" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
