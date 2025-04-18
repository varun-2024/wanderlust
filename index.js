//Require Express
const express = require("express");
const app = express();
const port = 8080;
//Require Mongoose
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
//Model
const Listing = require("./models/listing.js");
// Require Path
const path = require("path");

// Require EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Method Override Middleware
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Mongo DB Connection
main()
  .then(() => {
    console.log("Conected to MongoDB successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

//Root Get Path
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

// Tests Listing
app.get("/test", (req, res) => {
  let sampleListing = new Listing({});
  res.send("test");
});

//Server Listening
app.listen(port, () => {
  console.log("Server Listening on port 8080");
});
