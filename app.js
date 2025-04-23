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

// Require EJS Mate
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
// Require/Set EJS
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
/* app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My New Villa",
    description: "By the Beach",
    price: 1200,
    location: "Miami, Florida",
    country: "USA",
  });
  await sampleListing.save();
  console.log("Sample was Saved");

  res.send("Test Sucessful");
}); */

//Listing Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//Listing New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Listing Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  console.log("New Listing Created:", newListing);
  res.redirect("/listings");
});

//Listing Show Route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const showListing = await Listing.findById(id);
  res.render("listings/show.ejs", { showListing });
});

// Edit Get Request Route
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const editListing = await Listing.findById(id);
  res.render("listings/edit.ejs", { editListing });
});

// Edit Put Request Route
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body.listing);
  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    {
      new: true,
    }
  );
  console.log("Updated Listing:", updatedListing);
  res.redirect(`/listings/${id}`);
});

// Delete Request Route
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id, { deleted: true });
  console.log("Deleted Listing:", id);
  res.redirect("/listings");
});

//Server Listening
app.listen(port, () => {
  console.log("Server Listening on port 8080");
});
