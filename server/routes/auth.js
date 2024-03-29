import express from "express";
import {
  login,
  register,
  registerAdmin,
  resetPassword,
  sendEmail,
} from "../controllers/auth.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router(); // router has all crud get put post delete methods

// register

// router.post("/register", register);

// login

router.post("/login", login);

// register as Admin

// router.post("/register-admin", registerAdmin);

// send reset email

router.post("/send-email", sendEmail);

// reset password

router.post("/reset-password", resetPassword);

export default router;
