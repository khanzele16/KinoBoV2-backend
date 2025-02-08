import { model, Schema } from "mongoose";

const User = new Schema(
  {
    login: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    saves: {
      type: Array,
      default: [],
      required: true,
    },
  },
  { timestamps: true }
);

export default model("User", User);
