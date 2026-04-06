const express = require("express");
const app = express();
const Port = 8080;
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("bufferCommands", false);

const mongoUri = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/menu";

mongoose
  .connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
  })
  .catch((err) => {
    console.error("MongoDB initial connection failed:", err.message);
  });

app.use(express.json());

const menuRouter = require("./routes/menu");
app.use("/menu", menuRouter);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
