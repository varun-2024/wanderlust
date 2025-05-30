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
    // Move category inside the listing object and make it required
    category: Joi.array()
      .items(
        Joi.string().valid(
          "trending",
          "rooms",
          "cities",
          "mountains",
          "castles",
          "pools",
          "camping",
          "farms",
          "arctic",
          "beaches"
        )
      )
      .min(1)
      .required()
      .messages({
        "array.min": "Please select at least one category",
        "any.required": "Category selection is required",
      }),
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

/* const Joi = require("joi");
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
  category: Joi.array()
    .items(
      Joi.string().valid(
        "trending",
        "rooms",
        "cities",
        "mountains",
        "castles",
        "pools",
        "camping",
        "farms",
        "arctic",
        "beaches"
      )
    )
    .min(1)
    .required(),
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
 */
