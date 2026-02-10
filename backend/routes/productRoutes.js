import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct); // 🔴 REQUIRED
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);

export default router;
