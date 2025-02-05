import { create } from "domain";
import mongoose, { Schema } from "mongoose";
import { type } from "os";

// User Login Database Schema
const userLoginSchema = new Schema({
  name: {
    type: String,
    required: [true, "Provide a name"],
  },
  email: {
    type: String,
    required: [true, "Provide a email address"],
  },
  password: {
    type: String,
    required: [true, "Provide password"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  update: Date,
});

const User = mongoose.models.User || mongoose.model("User", userLoginSchema);
export default User;
