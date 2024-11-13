import { prisma } from "../db.config.js";
import { findStore } from "./store.repository.js";

export const insertMission = async (storeId, missionData) => {
  const store = await findStore(storeId);
  if (!store) return null;
  return await prisma.storeMission.create({ data: { storeId: store.id, description: missionData.description } });
};
