// controllers/userController.js
import express from "express";
import UserModel from "../models/UserModel.js";

const router = express.Router();

// Hae kaikki käyttäjät
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
