// models/CampaignModel.js
import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // id: Number,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    roles: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Role", // to which table its referring
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);

// Remember CamelCasing also in MongoDB Compass
