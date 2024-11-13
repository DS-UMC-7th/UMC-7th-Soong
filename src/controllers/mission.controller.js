import { findStoreById } from "../services/store.service.js";
import { addStoreMission, checkMissionChallenge } from "../services/mission.service.js";
import { CreateMissionDTO } from "../dtos/mission.dto.js";

export const addMission = async (req, res) => {
  try {
    const { storeId } = req.params;
    const missionData = CreateMissionDTO.validate(req.body);

    const store = await findStoreById(storeId);
    if (!store) throw new NotFoundError("Store not found");

    const newMission = await addStoreMission(storeId, missionData);
    res.status(201).json({ status: "success", message: "Mission added", data: newMission });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const challengeMission = async (req, res) => {
  try {
    const { storeId, missionId } = req.params;
    const missionStatus = await checkMissionChallenge(storeId, missionId);

    if (missionStatus) throw new ValidationError("Mission already challenged");
    
    res.status(200).json({ status: "success", message: "Mission successfully challenged" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
