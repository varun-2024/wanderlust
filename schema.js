const Joi = require("joi");
const ExpressError = require("./utils/expresserror.js");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().pattern(new RegExp("^[a-zA-Z0-9 ]+$")).required(),
    description: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9\\s,.!?]+$"))
      .required(),
    image: Joi.object({
      filename: Joi.string(), //.required()
      url: Joi.string().uri(), //.required()
    }).required(),
    price: Joi.number().integer().min(1).required(),
    location: Joi.string().pattern(new RegExp("^[a-zA-Z0-9\\s,]+$")).required(),
    country: Joi.string().pattern(new RegExp("^[a-zA-Z0-9\\s,]+$")).required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9\\s,.!?]+$"))
      .required()
      .min(15),
  }).required(),
});
/* ---------------- Middleware Shifted to Middleware.JS------------------ */
/* module.exports.validateListing = (req, res, next) => {
  console.log("Entered validateListing Middleware :");
  const { error } = module.exports.listingSchema.validate(req.body);
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
  const { error } = module.exports.reviewSchema.validate(req.body);
  console.log(error);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ExpressError(400, msg));
  }
  next();
}; */

// schema.js
// Make sure this path is correct

/* listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().pattern(new RegExp("^[a-zA-Z\\s-]+$")).required(), // Changed regex for title
    description: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9\\s,.!?\\-]+$")) // Changed regex for description
      .required(),
    image: Joi.object({
      filename: Joi.string().required(),
      url: Joi.string().uri().required(),
    }).required(),
    price: Joi.number().integer().min(1).required(), // Corrected .intiger() to .integer()
    location: Joi.string().pattern(new RegExp("^[a-zA-Z\\s-]+$")).required(), // Changed regex for location
    country: Joi.string().pattern(new RegExp("^[a-zA-Z\\s-]+$")).required(), // Changed regex for country
  }).required(),
}); */

/* let result = this.listingSchema.validate(req.body);
if (result.error) {
  throw new ExpressError(400, result.error);
} */
