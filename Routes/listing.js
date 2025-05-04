// Require Express
const express = require("express");
// Require Router
const router = express.Router();
// ExpressErrors Class
const ExpressError = require("../utils/expresserror.js");

//Model
// Listing Model
const Listing = require("../models/listing.js");

// Joi Schema
const {
  listingSchema,
  reviewSchema,
  validateListing,
  validateReviews,
} = require("../schema.js");

// wrapAsync Middleware
const asyncWrap = require("../utils/wrapAsync.js");

//Listing Index Route
router.get(
  "/",
  asyncWrap(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

//Listing New Route
router.get("/new", (req, res, next) => {
  res.render("listings/new.ejs");
});

//Listing Create Route
router.post(
  "/",
  validateListing,
  asyncWrap(async (req, res) => {
    console.log("Post requesr Recieved");
    if (!req.body.listing) {
      throw new ExpressError(400, "Send Valid data for Listing");
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log("New Listing Created:", newListing);
    res.redirect("/listings");
  })
);

//Listing Show Route
router.get(
  "/:id",
  asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    try {
      const showListing = await Listing.findById(id).populate("reviews");
      if (!showListing) {
        return next(new ExpressError(404, "Listing not found!"));
      }
      res.render("listings/show.ejs", { showListing });
    } catch (err) {
      if (err.name === "CastError") {
        return next(new ExpressError(400, "Invalid Listing ID!"));
      }
      next(err);
    }
  })
);

// Edit Get Request Route
router.get(
  "/:id/edit",
  asyncWrap(async (req, res) => {
    const { id } = req.params;
    const editListing = await Listing.findById(id);
    res.render("listings/edit.ejs", { editListing });
  })
);

// Edit Put Request Route
router.put(
  "/:id",
  validateListing,
  asyncWrap(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "Send Valid data for Listing");
    }
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
  })
);

// Delete Request Route
router.delete(
  "/:id",
  asyncWrap(async (req, res) => {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id, { deleted: true });
    console.log("Deleted Listing:", deletedListing, "Listing Id:", id);
    res.redirect("/listings");
  })
);

module.exports = router;
