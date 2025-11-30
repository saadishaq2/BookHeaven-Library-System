import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    address: String,
    countryCode: String,
    phone: String,
  },
  items: [
    {
      title: String,
      price: Number,
      quantity: Number,
      author: String,
      src: String,
    },
  ],
  paymentMethod: String,
  totalPrice: Number,
  date: { type: String, default: new Date().toISOString() },
  status: { type: String, default: "Pending" }, // could be Pending, Success, Failed
});

const cartOrder = mongoose.model("Order", orderSchema);
export default cartOrder;
