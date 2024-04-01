import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Provide username"],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Provide username"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Provide password"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: String,
  verifyToken: String,
  verifyTokenExpiry: String,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
