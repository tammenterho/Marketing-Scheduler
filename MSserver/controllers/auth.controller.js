import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

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
