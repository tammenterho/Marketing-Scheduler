import express from "express";
import { getAllUsers, getById } from "../controllers/user.controller.js";

const router = express.Router(); // this and you can use route. Also put to middleware in index.js

// get all
router.get("/", getAllUsers);

// get by id
router.get("/:id", getById);

export default router;
