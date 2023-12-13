import Role from "../models/Role.js";
import User from "../models/User.js";

export const register = async (req, res, next) => {
  const role = await Role.find({ role: "User" });
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    roles: role,
  });

  await newUser.save();
  console.log("Registered!");
  return res.status(200).send("User registered!");
};

//Moi
