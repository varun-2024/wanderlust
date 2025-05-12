// Require Express
const express = require("express");
// Require Router
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/wrapAsync.js");
const passport = require("passport");
const User = require("../models/user.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// Router Route Signup GET & POST Request for Signup
router
  .route("/signup")
  .get(userController.renderSignUpForm)
  .post(asyncWrap(userController.signUpUser));

// Router Route Signup GET & POST Request for Signup
router
  .route("/login")
  .get(userController.renderLogInForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    asyncWrap(userController.logInUser)
  );
//Route for Logout GET Request
router.get("/logout", asyncWrap(userController.logOutUser));

module.exports = router;
