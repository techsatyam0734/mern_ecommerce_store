import { pool } from "../database/db.js";

export const createPaymentsTable = async () => {
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS payments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                payment_method ENUM('cod','upi','card','netbanking','wallet') NOT NULL,
                payment_status ENUM('pending','success','failed','refunded') DEFAULT 'pending',
                transaction_id VARCHAR(255) UNIQUE,
                amount DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (order_id) REFERENCES orders(orderId) ON DELETE CASCADE
            )
       `;
    await pool.query(query);
  } catch (error) {
    console.log("Failed to create Payments Table", error);
    throw error;
  }
};
