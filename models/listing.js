const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: "Untitled Listing",
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      default:
        "https://images.unsplash.com/photo-1744791588287-6660d83418b3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8GVufDB8fHx8fA%3D%3D",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1744791588287-6660d83418b3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          : v,
    },
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  console.log("Mongoose Listing Schema Middleware step 1");
  if (listing) {
    let deletedReview = await Review.deleteMany({
      _id: { $in: listing.reviews },
    });
    console.log("Mongoose Listing Schema Middleware step 2");
    console.log("Deleted Reviews", deletedReview);
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
