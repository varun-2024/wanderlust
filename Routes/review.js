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

// Joi Schema
const {
  listingSchema,
  reviewSchema,
  validateListing,
  validateReviews,
} = require("../schema.js");

// Reviews Routes
// Review Post Request Route
router.post(
  "/",
  validateReviews,
  asyncWrap(async (req, res) => {
    //const { id } = req.params;
    console.log("This is Params Id: ", req.params.id);
    let listing = await Listing.findById(req.params.id);
    console.log("Listing Detail Review Post Route:", listing);
    console.log("Working Till here: req, body, review: ", req.body.review);
    let newReview = new Review(req.body.review);
    console.log("Not Working here");
    console.log("newReview Detail Review Post Route:", newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("New Review Saved");
    res.redirect(`/listings/${listing._id}`);
  })
);

//Delete Review Route
router.delete(
  "/:reviewId",
  asyncWrap(async (req, res) => {
    let { id, reviewId } = req.params;
    console.log(id, reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    console.log("Job done");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
