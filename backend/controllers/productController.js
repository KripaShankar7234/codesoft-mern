import Product from "../models/Product.js";

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

// GET by category
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Category fetch failed" });
  }
};

// ✅ CREATE PRODUCT (IMPORTANT)
export const createProduct = async (req, res) => {
  try {
    console.log("BODY:",req.body)
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error.message);
    res.status(500).json({ message: "Product creation failed" });
  }
};
