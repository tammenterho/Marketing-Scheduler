import express from "express";
import {
  deleteCampaign,
  getAllCampaigns,
  postCampaign,
} from "../controllers/campaign.controller.js";

const router = express.Router(); // router has all crud get put post delete methods

router.get("/campaigns/:userId", getAllCampaigns);

router.post("/campaigns", postCampaign);

router.delete("/campaign/:_id", deleteCampaign);

export default router;
