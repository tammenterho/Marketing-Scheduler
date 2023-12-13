import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router(); // router has all crud get put post delete methods

// register

router.post("/register", register);

// login

router.post("/login", login);

export default router;
