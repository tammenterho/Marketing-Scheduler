// models/CampaignModel.js
import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
  creator: String,
  company: String,
  id: Number,
  owner: Number,
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

const CampaignModel = mongoose.model("Campaign", CampaignSchema);

export default CampaignModel;
