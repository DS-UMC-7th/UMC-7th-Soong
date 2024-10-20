import { insertMission, checkMission } from "../repositories/mission.repository.js";

// 가게에 미션 추가
export const addStoreMission = async (storeId, missionData) => {
  return await insertMission(storeId, missionData);
};

// 미션 도전 여부 체크
export const checkMissionChallenge = async (storeId, missionId) => {
  return await checkMission(storeId, missionId);
};
