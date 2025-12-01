import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDB, pool } from "./src/database/db.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, async () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
  try {
    await connectDB();
  } catch (error) {
    console.log("ERROR Connecting to DB", error);
    throw error;
  }
});
