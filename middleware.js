const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/expresserror.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  console.log(
    "Inside isLoggedIn Middleware: ",
    req.path,
    "..",
    req.originalUrl
  );
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must Login to create a Listing");
    return res.redirect("/login");
  }
  console.log("isLoggedIn passed, calling next()");
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  console.log("Inside saveRedirectUrl Middleware: ");
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  console.log("saveRedirectUrl passed, calling next()");
  next();
};

module.exports.isOwner = async (req, res, next) => {
  console.log("Inside isOwner Middleware: ");
  const { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "Permission Denied!");
    return res.redirect(`/listings/${id}`);
    /* let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl); */
  }
  console.log("isOwner passed, calling next()");
  next();
};

module.exports.validateListing = (req, res, next) => {
  console.log("Entered validateListing Middleware :");
  const { error } = listingSchema.validate(req.body);
  console.log(error);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ExpressError(400, msg));
    //return next(new ExpressError(400, error));
  }
  console.log("validateListing passed, calling next()");
  next();
};

module.exports.validateReviews = (req, res, next) => {
  console.log("Entered validateReviews Middleware :");
  console.log(req.body);
  const { error } = reviewSchema.validate(req.body);
  console.log(error);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ExpressError(400, msg));
  }
  console.log("validateReviews passed, calling next()");
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  console.log("Inside isAuthor Middleware: ");
  const { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "Permission Denied, user not Authorised!");
    return res.redirect(`/listings/${id}`);
    /* let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl); */
  }

  next();
};
