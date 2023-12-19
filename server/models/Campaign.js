// models/CampaignModel.js
import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
  creator: String,
  company: String,
  owner: String,
  name: String,
  adtitle: String,
  adtext: String,
  adtarget: String,
  adarea: String,
  adbudget: Number,
  adstart: Date,
  adend: Date,
  mediainfo: String,
  adurl: String,
  adother: String,
  adstatus: String,
  adcontact: String,
});

export default mongoose.model("Campaign", CampaignSchema);
