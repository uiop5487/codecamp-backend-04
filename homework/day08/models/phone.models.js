import mongoose from "mongoose";

const PhoneSchema = new mongoose.Schema({
  phone: String,
  token: String,
  isAuth: Boolean,
});

export const Phone = mongoose.model("Phone", PhoneSchema);
