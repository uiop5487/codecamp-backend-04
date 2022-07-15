import mongoose from "mongoose";

const OgSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  personal: String,
  prefer: String,
  pwd: String,
  phone: String,
  og: OgSchema,
});

export const User = mongoose.model("User", UserSchema);
