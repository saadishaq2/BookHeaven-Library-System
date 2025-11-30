import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: {type: String},
  password: { type: String, required: true },
});

const Authorization= mongoose.model("Login/Signup", authSchema);

export default Authorization;
