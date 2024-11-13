import { prisma } from "../db.config.js";

export const addUser = async (data) => {
  const existingUser = await prisma.user.findFirst({ where: { email: data.email } });
  if (existingUser) return null;
  return (await prisma.user.create({ data })).id;
};
