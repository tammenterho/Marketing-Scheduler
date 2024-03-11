// models/CampaignModel.js
import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
  adType: Boolean,
  creationdate: Date,
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
  postDate: Date,
  mediainfo: String,
  adurl: String,
  adcta: String,
  adother: String,
  adstatus: String,
  adcontact: String,
  adpayer: String,
  postChannel: String,
});

export default mongoose.model("Campaign", CampaignSchema);
