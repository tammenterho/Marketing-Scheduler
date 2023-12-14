import express from "express";
import { getAllUsers, getById } from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router(); // this and you can use route. Also put to middleware in index.js

// get all
router.get("/", verifyAdmin, getAllUsers);

// get by id
router.get("/:id", verifyUser, getById);

export default router;
//fdsf
