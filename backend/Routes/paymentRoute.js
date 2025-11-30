// backend/Routes/paymentRoutes.js
import express from "express";
import Payment from "../Models/paymentSchema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error saving payment", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving payments", error });
  }
});

export default router;
