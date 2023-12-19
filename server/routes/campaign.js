import express from "express";
import { getAllCampaigns } from "../controllers/campaign.controller.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router(); // router has all crud get put post delete methods

router.get("/campaigns", getAllCampaigns);

export default router;
