import express from "express";
import Admin from "../Models/adminSchema.js";
const router = express.Router();

// Admin login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }

    res.json({
      success: true,
      user: { name: admin.name, role: "admin", email: admin.email },
      token: "admin-token-placeholder", // optional JWT
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

export default router;
