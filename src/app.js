import express from "express";

import userRoutes from "./routes/user.routes.js";
import { createTables } from "./utils/createTables.js";
import productRoutes from "./routes/product.routes.js";
import fileUpload from "express-fileupload";

const app = express();

//middlewares
app.use(
  fileUpload({
    tempFileDir: "./uploads",
    useTempFiles: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes declaration
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", productRoutes);

createTables();

export default app;
