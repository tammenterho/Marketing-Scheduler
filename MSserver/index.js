// index.js
import express from "express";
import http from "http";
import connectDB from "./db.js";
import campaignController from "./controllers/campaignController.js";
import userController from "./controllers/userController.js";

connectDB();

const app = express();
const server = http.createServer(app);

app.use(express.json());

// Käytä kampanjaan liittyviä reittejä
app.use("/api/campaigns", campaignController);

// Käytä käyttäjään liittyviä reittejä
app.use("/api/users", userController);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
