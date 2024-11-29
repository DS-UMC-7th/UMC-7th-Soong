import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({ log: ["query"] });
dotenv.config();


export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost", 
  user: process.env.DB_USER || "root",
  port: process.env.DB_PORT || 3306, 
  database: process.env.DB_NAME || "umc_data", 
  password: process.env.DB_PASSWORD || "sangwon0214!", 
  charset: 'utf8mb4', 
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0, 
});
