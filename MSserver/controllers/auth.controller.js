import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

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
  return res.status(200).send("User registered!");
};
