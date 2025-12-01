import { pool } from "../database/db.js";

export const createCartTable = async () => {
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS cart (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL DEFAULT 1,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES product(productId) ON DELETE CASCADE
            ) 
        `;
    await pool.query(query);
  } catch (error) {
    console.log("Failed to create Cart Table", error);
    throw error;
  }
};
