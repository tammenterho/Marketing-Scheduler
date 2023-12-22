// controllers/campaignController.js
import express from "express";
import Campaign from "../models/Campaign.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import User from "../models/User.js";

const router = express.Router();

// controllers/campaignController.js
export const getAllCampaigns = async (req, res, next) => {
  console.log("got here : " + req.params.userId);

  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    console.log("user tässänäin : " + user);

    if (!user.isAdmin) {
      const userCampaigns = await Campaign.find({ owner: userId });

      return next(CreateSuccess(200, "User Campaigns", userCampaigns));
    } else if (user.isAdmin) {
      const adminCampaigns = await Campaign.find();
      return next(CreateSuccess(200, "Admin campaigns", adminCampaigns));
    } else {
      return next(CreateError(400, "Couldn't find user"));
    }
  } catch (error) {
    console.log("erroria puskee");
    return next(CreateError(500, "Internal Server Error!"));
  }
};

export default router;
