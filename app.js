//Require Express
const express = require("express");
const app = express();
const port = 8080;

//Require DotEnv

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
console.log(process.env.SECRET);

//Require Mongoose
const mongoose = require("mongoose");
//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

// Require Path
const path = require("path");

// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

//Cookie-Parser
const cookieParser = require("cookie-parser");

// Connect-Flash
const flash = require("connect-flash");
app.use(flash());

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
app.use("/uploads", express.static("uploads"));
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
const listingRouter = require("./Routes/listing.js");
const reviewRouter = require("./Routes/review.js");
const userRouter = require("./Routes/user.js");

//Cookie-Parser Use
app.use(cookieParser("secretcode"));

// Express Session & Mongo Session
const session = require("express-session");
const MongoStore = require("connect-mongo");
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: "supersecretcode",
  },
  touchAfter: 24 * 3600,
});
// Store Error & Login
store.on("error", function (err) {
  console.log("Session Store Error", err);
});
store.on("connected", function () {
  console.log("Session Store Connected");
});
const sessionOptions = {
  store,
  secret: "supersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mongo DB Connection
main()
  .then(() => {
    console.log("Conected to MongoDB successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

async function main() {
  await mongoose.connect(dbUrl);
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
/* ----------------------------------------------------------------------------------------- */

// Middleware for Flash Messages
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  //console.log(success);
  next();
});

/* --------------------------------------------------------------- */
// Use Listing & Review Route
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

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
