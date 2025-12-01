import { pool } from "../database/db.js";

export const createReviewTable = async () => {
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS review (
                productId INT NOT NULL,
                userId INT NOT NULL,
                orderId INT NOT NULL,
                rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (productId) REFERENCES product(productId),
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (orderId) REFERENCES orders(orderId)
            )
        `;

    await pool.query(query);
  } catch (error) {
    console.log("Failed to create Reviews Table", error);
    throw error;
  }
};
