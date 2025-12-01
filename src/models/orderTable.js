import { pool } from "../database/db.js";

export const createOrders = async () => {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS orders (
            orderId INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            total_price DECIMAL(10,2) NOT NULL,
            tax_price DECIMAL(10,2) NOT NULL,
            shipping_price DECIMAL(10,2) NOT NULL,
            status ENUM('processing','shipped','delivered','cancelled') DEFAULT 'processing',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        )
    `;

    await pool.query(query);
  } catch (error) {
    console.log("Failed to create Orders Table", error);
    throw error;
  }
};
