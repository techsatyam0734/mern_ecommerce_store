import express from "express";
import dotenv from "dotenv";
import { connectDB, pool } from "./database/db.js";

const app = express();
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Api working !");
});

app.listen(PORT, async () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
  try {
    await connectDB();
  } catch (error) {
    console.log("ERROR Connecting to DB",error);
  }
});
