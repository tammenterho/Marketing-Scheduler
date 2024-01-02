import express from "express";
import {
  deleteCampaign,
  getAllCampaigns,
  postCampaign,
  updateCampaign,
} from "../controllers/campaign.controller.js";

const router = express.Router(); // router has all crud get put post delete methods

router.get("/campaigns/:userId", getAllCampaigns);

router.post("/campaigns", postCampaign);

router.delete("/campaigns/:campaignId", deleteCampaign);

router.put("/campaigns/:campaignId", updateCampaign);

export default router;
