import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDB, pool } from "./src/database/db.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
  try {
    await connectDB();
  } catch (error) {
    console.log("ERROR Connecting to DB", error);
    throw error;
  }
});
