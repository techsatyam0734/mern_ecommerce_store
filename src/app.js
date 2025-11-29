import express from "express";

import userRoutes from "./routes/user.routes.js";
import { createUserTable } from "./models/userTable.js"; 

const app = express();

//middlewares
app.use(express.json())

//routes declaration
app.use("/api/v1/", userRoutes);

createUserTable();

export default app;
