import express from "express";
import { register } from "../controllers/auth.controller.js";

const router = express.Router(); // router has all crud get put post delete methods

// register

router.post("/register", register);

export default router;
