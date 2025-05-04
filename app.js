//Require Express
const express = require("express");
const app = express();
const port = 8080;
//Require Mongoose
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Require Path
const path = require("path");

// ExpressErrors Class
const ExpressError = require("./utils/expresserror.js");

// Middlewares

// Require EJS Mate
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
// Require/Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Bootsrap
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist")); // If you need jQuery
app.use(
  "/js",
  express.static(__dirname + "/node_modules/@popperjs/core/dist/umd")
); // If you need Popper.js

// Method Override Middleware
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Routes
const listings = require("./Routes/listing.js");
const reviews = require("./Routes/review.js");
// Use Listing & Review Route
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// Mongo DB Connection
main()
  .then(() => {
    console.log("Conected to MongoDB successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Middleware for logging request details works for all routes and requests
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(
    "Request Method: ",
    req.method,
    "\nHost Name : ",
    req.hostname,
    "\nRequest Path",
    req.path,
    "\nRequest Time :",
    req.time
  );
  return next();
});

//Root Get Path
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

/* ----------------------------------------------------------------------------------------- */

// 404 Error Page Second Method
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error Handling
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong" } = err;
  res.status(status).render("error.ejs", { message });
  //res.status(status).send(message);
});

//Server Listening
app.listen(port, () => {
  console.log("Server Listening on port 8080");
});

/* ------------------------------------------------------------------------------------------ */

// validateListing
/* const validateListing = (req, res, next) => {
  let result = listingSchema.validate(req.body);
  console.log(result);
  if (result.error) {
    let errMsg = result.error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}; */

// Middleware for listings Path Testing
/* app.use("/listings", (req, res, next) => {
  console.log("Middleware for Listings Path Testing");
  return next();
}); */

//Middleware for API Route
/* app.use("/api", (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    console.log("Access Granted to API Route");
    return next();
  } else {
    console.log("Access Denied to API Route");
    res.status(403).send("Access Denied");
  }
}); */

// Second Method of Writing
/* const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    console.log("Access Granted to API Route");
    return next();
  } else {
    console.log("Access Denied to API Route");
    res.status(403).send("Access Denied");
  }
}; */

// Api Route Test
/* app.get("/api", checkToken, (req, res) => {
  res.send("Data");
}); */

// Tests Listing
/* app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My New Villa",
    description: "By the Beach",
    price: 1200,
    location: "Miami, Florida",
    country: "USA",
  });
  await sampleListing.save();
  console.log("Sample was Saved");

  res.send("Test Sucessful");
}); */

// Admin Route Test
/* app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access to Admin is Forbidden");
}); */

// Test Route for Error
/* app.get("/error", (req, res) => {
  abc = abc;
}); */

// Custom Error Handling Middleware
/* app.use((err, req, res, next) => {
  console.log("Error 1: Something Went Wrong Custome Error");
  next(err);
}); */

// Mongoose Error Handling Middleware
/* app.use((err, req, res, next) => {
  console.log("Error 2: -----MONGOOSE ERROR-----");
  console.log("Error 2 Name: ", err.name);
  err.status = 400;
  err.message = "Invalid ID Format";
  next(err);
}); */

// Error Handling Middleware
/* app.use((err, req, res, next) => {
  console.log("Error 3: -----ERROR-----");
  if (res.headersSent) {
    console.log("Headers sent Error: ", err);
    return next(err);
  }

  let { status = 500, message = "Error 4: Some Error Occurred" } = err;
  console.log(err);
  //next(new ExpressError(err));
  res.status(status).send(`Status is : ${status}, Message is : ${message}`);
}); */

// AsyncWrap Middleware
/* function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
} */

// 404 Error Page
/* app.use((req, res) => {
  res.status(404).send("Error Page Not Found " + req.path);
});
 */

// Access Token
/* const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    console.log("Access Granted to API Route");
    return next();
  }
  return next(new ExpressError(401, "Access Denied"));
}; */

/* ------------------------------------------------------------------------------------------ */

// Joi Schema
/* const {
  listingSchema,
  reviewSchema,
  validateListing,
  validateReviews,
} = require("./schema.js"); */

//Model
// Listing Model
/* const Listing = require("./models/listing.js"); */
// Review Model
/* const Review = require("./models/review.js"); */

// wrapAsync Middleware
/* const asyncWrap = require("./utils/wrapAsync.js"); */
