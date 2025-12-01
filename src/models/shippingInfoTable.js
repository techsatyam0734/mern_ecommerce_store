import { pool } from "../database/db.js";

export const createShippingInfoTable = async () => {
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS shippingInfo (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL UNIQUE,
                full_name VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                state VARCHAR(100) NOT NULL,
                city VARCHAR(100) NOT NULL,
                country VARCHAR(100) NOT NULL,
                address TEXT NOT NULL,
                pincode VARCHAR(20) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (order_id) REFERENCES orders(orderId) ON DELETE CASCADE
            )
        `;
    await pool.query(query);
  } catch (error) {
    console.log("Failed to create shippingInfo Table", error);
    throw error;
  }
};
