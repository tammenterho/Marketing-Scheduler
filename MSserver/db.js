import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Lataa ympäristömuuttujat .env-tiedostosta

export default function connectDB() {
  const url = process.env.DATABASE_URL;

  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once("open", () => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });
}
