import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {

});

function start() {
  mongoose
    .connect(
      process.env.DB_URL
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));
  app.listen(4444, () => {
    console.log("Server started on port 3000");
  });
}

start();