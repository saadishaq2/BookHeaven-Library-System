import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./db.js";
import path from "path";

//Import Routes
import booksRoute from "./Routes/booksRoute.js";
import authRoute from "./Routes/authRoute.js";
import userPayment from "./Routes/paymentRoute.js";
import orderRoute from "./Routes/orderRoute.js";
import adminAuth from "./Routes/adminAuthRoute.js"

dotenv.config();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Connect DB
await dbConnection();

//Serve uploaded images

// Serve uploaded PDF files publicaly. we make this folder public so we can access the files from 
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//Main Routes
app.use("/api/booksData", booksRoute);
app.use("/api/user/auth", authRoute);
app.use("/api/payments", userPayment);
app.use("/api/orders", orderRoute);
app.use("/api/admin/auth", adminAuth);

app.use((err, req, res, next) => {
  console.error("Backend Error:", err);
  res.status(500).json({ error: err.message });
});


//Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
