import { insertMission, checkMission } from "../repositories/mission.repository.js";
import { getMyOngoingMissions, completeMission } from "../repositories/mission.repository.js";

export const addStoreMission = async (storeId, missionData) => {
  return await insertMission(storeId, missionData);
};

export const listStoreMissions = async (storeId) => {
  return await getStoreMissions(storeId);
};

export const listUserOngoingMissions = async (userId) => {
  return await getMyOngoingMissions(userId);
};

export const completeUserMission = async (userId, missionId) => {
  return await completeMission(userId, missionId);
};
