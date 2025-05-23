const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReviews = async (req, res) => {
  //const { id } = req.params;
  console.log("This is Params Id: ", req.params.id);
  let listing = await Listing.findById(req.params.id);
  console.log("Listing Detail Review Post Route:", listing);
  console.log("Working Till here: req, body, review: ", req.body.review);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  //console.log("Not Working here");
  console.log("newReview Detail Review Post Route:", newReview);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  console.log("New Review Saved");
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReviews = async (req, res) => {
  let { id, reviewId } = req.params;
  console.log(id, reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  console.log("Job done");
  req.flash("success", "Review Deleted Successfully!");
  res.redirect(`/listings/${id}`);
};
