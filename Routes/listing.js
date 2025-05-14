// Require Express
const express = require("express");
// Require Router
const router = express.Router();
// ExpressErrors Class
const ExpressError = require("../utils/expresserror.js");

// Cloudinary
const { cloudinary, storage } = require("../cloudConfig.js");

// Multer
const multer = require("multer");
const upload = multer({ storage });

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

//Route Route - Listing Index Route (GET Request) & Listing Create Route (POST Request)
router
  .route("/")
  .get(asyncWrap(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    asyncWrap(listingController.createListings)
  );

//Listing New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Router Route- Listing Show Route(GET Request) & Listing Update Route (PUT Request) & Delete Route (DELETE Request)
router
  .route("/:id")
  .get(asyncWrap(listingController.showListings))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    upload.single("listing[image]"),
    asyncWrap(listingController.updateListings)
  )
  .delete(isLoggedIn, isOwner, asyncWrap(listingController.destroyListings));

// Edit Get Request Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncWrap(listingController.renderEditForm)
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
