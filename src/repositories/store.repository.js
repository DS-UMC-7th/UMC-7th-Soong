import { prisma } from "../db.config.js";

export const insertStore = async (storeData) => {
  return await prisma.store.create({ data: { name: storeData.name, location: storeData.location } });
};

export const findStore = async (storeId) => {
  return await prisma.store.findUnique({ where: { id: parseInt(storeId) } });
};
