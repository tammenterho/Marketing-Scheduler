// index.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import roleRoute from "./routes/role.js";
import authRoute from "./routes/auth.js";
const app = express();
dotenv.config(); // error -> throw new MongooseError('The `uri` parameter to `openUri()` must be a ' +

app.use(express.json()); // can use json format in body
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);

// DB connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database!");
  } catch (error) {
    throw error;
  }
};

app.listen(5050, () => {
  connectMongoDB("AuthDB");
  console.log("connected to backend");
});
