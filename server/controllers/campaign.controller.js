// controllers/campaignController.js
import express from "express";
import Campaign from "../models/Campaign.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";

const router = express.Router();

// Hae kaikki kampanjat
export const getAllCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find();
    return next(CreateSuccess(200, "All Campaigns", campaigns));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error!"));
  }
};

export default router;
