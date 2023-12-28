// controllers/campaignController.js
import express from "express";
import Campaign from "../models/Campaign.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import User from "../models/User.js";

const router = express.Router();

// controllers/campaignController.js

// getAllCampaigns
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

// postCampaign

export const postCampaign = async (req, res, next) => {
  console.log("posting in server");

  try {
    // Oletan, että kampanja tiedot tulevat pyynnön rungosta newCampaign-kentän alla
    const newCampaign = req.body;
    console.log("tämä on serverin uusi kampanja" + newCampaign);

    // Luo uusi Campaign-instanssi Mongoose-mallin perusteella
    const campaign = new Campaign(newCampaign);

    // Tallenna kampanja tietokantaan
    const savedCampaign = await campaign.save();

    // Palauta tallennettu kampanja vastauksena
    return next(CreateSuccess(201, "Campaign successfully created"));
  } catch (error) {
    console.error("Error posting campaign:", error);
    return next(CreateError(500, "Internal Server Error"));
  }
};

export const deleteCampaign = async (req, res, next) => {
  console.log("deleting campaign server, campaign id");

  try {
    const campaignId = req.params.campaignId;

    const res = await Campaign.findByIdAndDelete(campaignId);
  } catch (error) {
    console.error("Error deleting campaign:", error);
    return next(CreateError(500, "Internal Server Error"));
  }
};

export default router;
