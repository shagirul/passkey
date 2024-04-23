import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // select: false,
    minLength: [4, "Enter 4 digit character"],
  },
});

mongoose.models = {};

export const User = mongoose.model("User", schema);
