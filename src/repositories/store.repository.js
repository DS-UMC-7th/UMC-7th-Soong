import { prisma } from "../db.config.js";

export const insertStore = async (storeData) => {
  try {
    const newStore = await prisma.store.create({
      data: {
        name: storeData.name,
      },
    });
    return newStore;
  } catch (error) {
    console.error("Error inserting store:", error);
    throw error;
  }
};

export const findStore = async (storeId) => {
  try {
    const store = await prisma.store.findUnique({
      where: {
        id: parseInt(storeId),
      },
    });
    return store;
  } catch (error) {
    console.error("Error finding store:", error);
    throw error;
  }
};
