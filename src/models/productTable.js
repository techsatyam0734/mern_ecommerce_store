import { pool } from "../database/db.js";

export const createProductTable = async () => {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS product(
            productId INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(100) NOT NULL,
            price DECIMAL(7,2) NOT NULL,
            category VARCHAR(100) NOT NULL,
            ratings DECIMAL(3,2) DEFAULT 0,
            images JSON NOT NULL,
            stock INT NOT NULL,
            created_by INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
        );
        `;
    await pool.query(query);
  } catch (error) {
    console.log("Failed to create Products Table", error);
    throw error;
  }
};
