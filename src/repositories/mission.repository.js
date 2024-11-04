import { prisma } from "../db.config.js";
import { findStore } from "./store.repository.js";


export const insertMission = async (storeId, missionData) => {
  const store = await findStore(storeId);
  if (!store) return null;

  try {
    const newMission = await prisma.storeMission.create({
      data: {
        storeId: store.id,
        description: missionData.description,
      },
    });
    return newMission;
  } catch (error) {
    console.error("Error inserting mission for storeId:", storeId, error);
    throw error;
  }
};


export const checkMission = async (storeId, missionId) => {
  const storeIdNum = parseInt(storeId);
  const missionIdNum = parseInt(missionId);

  if (isNaN(storeIdNum) || isNaN(missionIdNum)) {
    throw new Error("Invalid storeId or missionId");
  }

  try {
    const missionExists = await prisma.storeMission.findFirst({
      where: {
        id: missionIdNum,
        storeId: storeIdNum,
      },
    });
    return !!missionExists;
  } catch (error) {
    console.error("Error checking mission existence:", error);
    throw error;
  }
};


export const getStoreMissions = async (storeId) => {
  try {
    const missions = await prisma.storeMission.findMany({
      where: { storeId: parseInt(storeId) },
      select: {
        id: true,
        description: true,
      },
      orderBy: { id: "asc" },
    });
    return missions;
  } catch (error) {
    console.error("Error fetching missions for storeId:", storeId, error);
    throw error;
  }
};


export const getMyOngoingMissions = async (userId) => {
  try {
    const ongoingMissions = await prisma.userMissionProgress.findMany({
      where: { userId: parseInt(userId), status: 'ongoing' },
      select: {
        id: true,
        mission: {
          select: {
            id: true,
            description: true,
            store: { select: { id: true, name: true } },
          },
        },
      },
    });
    return ongoingMissions;
  } catch (error) {
    console.error("Error fetching ongoing missions for userId:", userId, error);
    throw error;
  }
};


export const completeMission = async (userId, missionId) => {
  const userIdNum = parseInt(userId);
  const missionIdNum = parseInt(missionId);

  if (isNaN(userIdNum) || isNaN(missionIdNum)) {
    throw new Error("Invalid userId or missionId");
  }

  try {
    const updatedMission = await prisma.userMissionProgress.updateMany({
      where: { userId: userIdNum, missionId: missionIdNum, status: 'ongoing' },
      data: { status: 'completed' },
    });
    return updatedMission.count > 0;
  } catch (error) {
    console.error("Error completing mission for userId:", userId, "missionId:", missionId, error);
    throw error;
  }
};
