// Require Express
const express = require("express");
// Require Router
const router = express.Router();
// ExpressErrors Class
const ExpressError = require("../utils/expresserror.js");

// isLoggedIn
const { isLoggedIn } = require("../middleware.js");

//Model
// Listing Model
const Listing = require("../models/listing.js");
// Middleware
const {
  saveRedirectUrl,
  isOwner,
  validateListing,
  validateReviews,
} = require("../middleware.js");

// Joi Schema
const { listingSchema, reviewSchema } = require("../schema.js");

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
router.get("/new", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.render("listings/new.ejs");
});

//Listing Create Route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  asyncWrap(async (req, res) => {
    console.log("Post requesr Recieved");
    if (!req.body.listing) {
      throw new ExpressError(400, "Send Valid data for Listing");
    }
    const newListing = new Listing(req.body.listing);
    console.log("Req User : ", req.user);
    newListing.owner = req.user._id;
    await newListing.save();
    console.log("New Listing Created:", newListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  })
);

//Listing Show Route
router.get(
  "/:id",
  asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    const showListing = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");
    if (!showListing) {
      req.flash("error", "Sorry, Listing Does Not Exist!");
      return res.redirect("/listings");
    }
    console.log("Listing :", showListing);
    res.render("listings/show.ejs", { showListing });
  })
);

// Edit Get Request Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncWrap(async (req, res) => {
    const { id } = req.params;
    const editListing = await Listing.findById(id);
    if (!editListing) {
      req.flash("error", "Sorry, Listing Does Not Exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { editListing });
  })
);

// Update Route - Edit Put Request Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
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
    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
  })
);

// Delete Request Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  asyncWrap(async (req, res) => {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id, { deleted: true });
    console.log("Deleted Listing:", deletedListing, "Listing Id:", id);
    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listings");
  })
);

module.exports = router;

/* let listing = await Listing.findById(id);
if (!listing.owner._id.equals(res.locals.currUser._id)) {
  req.flash("error", "Permission Denied!");
  return res.redirect(`/listings/${id}`);
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
}
 */
