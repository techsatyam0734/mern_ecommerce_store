import { pool } from "../database/db.js";

export const createOrderItemTable = async () => {
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS orderItems (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                image TEXT NOT NULL,
                title TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (order_id) REFERENCES orders(orderId) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES product(productId) ON DELETE CASCADE
            )
        `;

    await pool.query(query);
  } catch (error) {
    console.log("Failed to create Order Items Table", error);
    throw error;
  }
};
