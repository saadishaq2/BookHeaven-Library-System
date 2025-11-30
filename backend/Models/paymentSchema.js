
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userName: String,
  plan: String,
  price: Number,
  date: String,
  status: String,
});

const Payment= mongoose.model("Payment", paymentSchema);
export default Payment;

