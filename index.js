import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// use
app.use(express.json());

// routes


function start() {
  mongoose
    .connect(
      process.env.DB_URL
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));
  app.listen(4444, () => {
    console.log("Server started on port 4444");
  });
}

start();