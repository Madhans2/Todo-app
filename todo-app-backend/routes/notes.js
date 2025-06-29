import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// GET /api/notes/private
router.get("/private", authenticate, async (req, res) => {
  try {
    const notes = await Note.find({ userEmail: req.user.email });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
