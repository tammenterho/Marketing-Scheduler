import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import UserToken from "../models/UserToken.js";

export const register = async (req, res, next) => {
  const role = await Role.find({ role: "User" });
  const salt = await bcrypt.genSalt(10); // Only 3 lines and password is crypted
  const hashPassword = await bcrypt.hash(req.body.password, salt); // Only 3 lines and password is crypted
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: hashPassword, // Only 3 lines and password is crypted
    roles: role,
  });

  await newUser.save();
  console.log("Registered!");
  return next(CreateSuccess(200, "User Registered"));
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "role"
    );
    const { roles } = user;

    // console.log("user: " + user + " " + req);

    if (!user) {
      return next(CreateError(404, "User not found!"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(CreateError(400, "Password is incorrect"));
    }
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        roles: roles,
      },
      process.env.JWT_SECRET
    );
    res;
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      status: 200,
      message: "Login success",
      data: user,
    });
    // return next(CreateSuccess(200, "Login succesful!"));
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
};

export const registerAdmin = async (req, res, next) => {
  const role = await Role.find({});
  const salt = await bcrypt.genSalt(10); // Only 3 lines and password is crypted
  const hashPassword = await bcrypt.hash(req.body.password, salt); // Only 3 lines and password is crypted
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: hashPassword, // Only 3 lines and password is crypted
    isAdmin: true,
    roles: role,
  });

  await newUser.save();
  console.log("Registered!");
  return next(CreateSuccess(200, "User Registered"));
};

export const sendEmail = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: { $regex: "^" + email + "$", $options: "i" },
  });
  if (!user) {
    return next(CreateError(404, "User not found"));
  }
  const payload = {
    email: user.email,
  };
  const expiryTime = 300;
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiryTime,
  });

  const newToken = new UserToken({
    userId: user._id,
    token: token,
  });

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  let mailDetails = {
    from: "terho.mikko@gmail.com",
    to: email,
    subject: "Reset Password",
    html: `
    <html>
    <head>
    <title>Password Reset Request</title>
    </head>
    <body>
    <h1>Password Reset Request</h1>
    <p>Dear ${user.userName},</p>
    <p>We have received a request to reset your password for your account in Marketing Scheduler. To complete the password reset process, please click on the button below: </p>
    <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px; "> Reset Password</button></a>
    <p>Please note that this link is only valid for 5mins. If you did not request a password reset, please disregard this message and contact terho.mikko@gmail.com</p>
    <p>Thank you</p>
    <p>Mikko Terho</p>
    </body>
    </html>
    
    `,
  };
  mailTransporter.sendMail(mailDetails, async (err, data) => {
    if (err) {
      console.log(err);
      return next(
        CreateError(500, "Something went wrong while sending the email")
      );
    } else {
      await newToken.save();
      return next(CreateSuccess(200, "Email sent successfully!"));
    }
  });
};

export const resetPassword = (req, res, next) => {};
