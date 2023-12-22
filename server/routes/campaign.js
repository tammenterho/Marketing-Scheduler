import express from "express";
import {
  getAllCampaigns,
  postCampaign,
} from "../controllers/campaign.controller.js";

const router = express.Router(); // router has all crud get put post delete methods

router.get("/campaigns/:userId", getAllCampaigns);

router.post("/campaigns", postCampaign);

export default router;
