import { findStore } from "./store.repository.js";

export const insertMission = async (storeId, missionData) => {
  const store = await findStore(storeId);
  if (!store) return null;

  if (!store.missions) store.missions = [];
  const newMission = { id: store.missions.length + 1, ...missionData };
  store.missions.push(newMission);
  return newMission;
};

export const checkMission = async (storeId, missionId) => {
  const store = await findStore(storeId);
  if (!store || !store.missions) return false;

  return store.missions.some((mission) => mission.id === parseInt(missionId));
};
