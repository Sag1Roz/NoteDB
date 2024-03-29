import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },

  isAdmin: {
    type: Boolean,
    require: true,
    default: false,
  },

  createdAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

export const User = mongoose.model("users", UserSchema);
