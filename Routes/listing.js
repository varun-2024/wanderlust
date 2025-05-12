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

// Controllers
const listingController = require("../controllers/listing.js");

//Listing Index Route
router.get("/", asyncWrap(listingController.index));

//Listing New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Listing Create Route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  asyncWrap(listingController.createListings)
);

//Listing Show Route
router.get("/:id", asyncWrap(listingController.showListings));

// Edit Get Request Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncWrap(listingController.renderEditForm)
);

// Update Route - Edit Put Request Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  asyncWrap(listingController.updateListings)
);

// Delete Request Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  asyncWrap(listingController.destroyListings)
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
