import { create } from "domain";
import mongoose, { Schema } from "mongoose";
import { type } from "os";

// User Signin Database Schema
const userLoginSchema = new Schema({
  username: {
    type: String,
    required: [true, "Provide a username"],
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
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  update: Date,
});

const User = mongoose.models.User || mongoose.model("User", userLoginSchema);
export default User;
