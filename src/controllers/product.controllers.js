import { pool } from "../database/db.js";
import { v2 as cloudinary } from "cloudinary";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const created_by = req.user.id;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    let uploadedImages = [];
    if (req.files && req.files.images) {
      const images = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      for (const image of images) {
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: "Ecommerce_Product_Images",
          width: 1000,
          crop: "scale",
        });

        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const sql = `
      INSERT INTO product
      (name, description, price, category, stock, images, created_by) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name,
      description,
      price,
      category,
      stock,
      JSON.stringify(uploadedImages),
      created_by,
    ];

    const [result] = await pool.query(sql, values);

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      productId: result.insertId,
    });
  } catch (error) {
    console.log("Error creating product", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal Server Error",
    });
  }
};
