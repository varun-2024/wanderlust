const Listing = require("./models/listing.js");
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
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  console.log("Inside sveRedirectUrl Middleware: ");
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
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
  next();
};
