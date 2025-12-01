import { Router } from "express";
import { createProduct } from "../controllers/product.controllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.post("/admin/create", isAuthenticated, createProduct);

export default router;
