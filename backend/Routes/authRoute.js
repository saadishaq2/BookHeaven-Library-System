import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Authorization from "../Models/authSchema.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await Authorization.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await Authorization.create({ email, password: hashedPassword });

    res.json({ msg: "User registered successfully " });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Authorization.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials " });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN || "1d",});

  res.json({ msg: "Login successful ", token });
});

export default router;