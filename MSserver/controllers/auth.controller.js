import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  const role = await Role.find({ role: "User" });

  if (!role) {
    console.log("Role 'User' not found!");
    return res.status(400).send("Role 'User' not found!");
  }
  console.log("Rooli on" + role);

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

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    console.log("user: " + user + " " + req);

    if (!user) {
      return res.status(404).send("User not found!");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send("Password is incorrect");
    }
    return res.status(200).send("Login success");
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
};
