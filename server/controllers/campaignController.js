// controllers/campaignController.js
import express from "express";
import CampaignModel from "../models/CampaignModel.js";

const router = express.Router();

// Hae kaikki kampanjat
router.get("/", async (req, res) => {
  try {
    const campaigns = await CampaignModel.find();
    res.json(campaigns);
    console.log("kampanjat:  " + campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
