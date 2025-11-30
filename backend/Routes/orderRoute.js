import express from "express";
import Order from "../Models/orderSchema.js";

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error saving order", error });
  }
});

// Get all orders (for admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});
//Update order status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Order Status Updated", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
});


export default router;
