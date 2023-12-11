// models/CampaignModel.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: Number,
  company: String,
  firstName: String,
  lastName: String,
  login: String,
  email: String,
  phone: String,
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
