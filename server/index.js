// index.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import roleRoute from "./routes/role.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import campaignsRoute from "./routes/campaign.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config(); // error -> throw new MongooseError('The `uri` parameter to `openUri()` must be a ' +

// middleware
app.use(express.json()); // can use json format in body
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/campaigns", campaignsRoute);

// Response handler middleware
app.use((obj, req, res, next) => {
  const statusCode = obj.status || 500;
  const message = obj.message || "Something went wrong!";
  return res.status(statusCode).json({
    success: [200, 201, 204].some((a) => a === obj.status) ? true : false,
    status: statusCode,
    message: message,
    data: obj.data,
  });
});

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

// when testing with postman, add Content-Type - Application/json to headers for the req to work
