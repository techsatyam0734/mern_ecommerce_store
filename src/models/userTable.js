import { pool } from "../database/db.js";

export const createUserTable = async () => {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fname VARCHAR(100) NOT NULL,
            lname VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    await pool.query(query);
    console.log("User Table created successfully!");
  } catch (error) {
    console.error("❌ Failed To Create Users Table:", error);
    process.exit(1);
  }
};
