// Require Express
const express = require("express");
// Require Router
const router = express.Router({ mergeParams: true });

// ExpressErrors Class
const ExpressError = require("../utils/expresserror.js");

// wrapAsync Middleware
const asyncWrap = require("../utils/wrapAsync.js");
// Model
// Listing Model
const Listing = require("../models/listing.js");
// Review Model
const Review = require("../models/review.js");

// Middleware
const {
  saveRedirectUrl,
  isOwner,
  validateListing,
  validateReviews,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

// Joi Schema
const { listingSchema, reviewSchema } = require("../schema.js");

// Controllers
const reviewController = require("../controllers/reviews.js");

// Reviews Routes
// Review Post Request Route
router.post(
  "/",
  validateReviews,
  isLoggedIn,
  asyncWrap(reviewController.createReviews)
);

//Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  asyncWrap(reviewController.destroyReviews)
);

module.exports = router;
