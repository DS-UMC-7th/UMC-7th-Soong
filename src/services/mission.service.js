import { insertMission, checkMission } from "../repositories/mission.repository.js";
import { NotFoundError } from "../errors.js";

export const addStoreMission = async (storeId, missionData) => {
  const result = await insertMission(storeId, missionData);
  if (!result) throw new NotFoundError("Store not found");
  return result;
};
