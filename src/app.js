import express from "express";

import userRoutes from "./routes/user.routes.js";
import { createTables } from "./utils/createTables.js";

const app = express();

//middlewares
app.use(express.json());

//routes declaration
app.use("/api/v1/", userRoutes);

createTables();

export default app;
