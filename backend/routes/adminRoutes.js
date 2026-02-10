import express from "express";

const router = express.Router();

// Placeholder admin routes
router.get('/', (req, res) => {
  res.json({ message: 'Admin routes placeholder' });
});

export default router;
